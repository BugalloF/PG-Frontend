// Dependencies
import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import swal from "sweetalert";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";
// Files
import {profile, changePassword} from "../../redux/actions/index";
import s from "./ChangePassword.module.css";

function ChangePassword()
{
  const dispatch = useDispatch();
  const user = useSelector(state => state.profile);
  const loggedUser = window.localStorage.getItem("userData");
  const {profileId} = useParams();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    oldPassword: "",
    password: "",
    repeatPassword: "",
  });
  // Show or hide password
  const [oldPassword, setOldPassword] = useState(false);
  const [password, setPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => dispatch(profile(loggedUser, profileId)), [dispatch]);
  
  function validate(input)
  {
    const errors = {};
    
    if(!input.oldPassword)
    {
      errors.oldPassword = <font></font>;
    }
    else if(input.password.length < 8)
    {
      errors.password = <p className={s.AlertText}>La contraseña debe contener al menos 8 carácteres.</p>;
    }
    else if(input.password !== input.repeatPassword)
    {
      errors.repeatPassword = <p className={s.AlertText}>Las contraseñas no coinciden.</p>;
    };
    
    return errors;
  };
  
  function handleChange(e)
  {
    setInput({...input, [e.target.name]: e.target.value});
    setErrors(validate({...input, [e.target.name]: e.target.value}));
  };
  
  function handleShowOldPassword(e)
  {
    e.preventDefault(e);
    setOldPassword(oldPassword => !oldPassword);
  };
  
  function handleShowPassword(e)
  {
    e.preventDefault(e);
    setPassword(password => !password);
  };
  
  function handleShowRepeatPassword(e)
  {
    e.preventDefault(e);
    setRepeatPassword(repeatPassword => !repeatPassword);
  };
  
  async function handleSubmit(e)
  {
    const foundPassword = user.found && user.found.password;
    
    if(Object.keys(validate(input)).length > 0)
    {
      e.preventDefault();
      swal({
        text: "Por favor, complete todos los campos correctamente.",
        icon: "warning",
    });
    }
    else
    {
      if(foundPassword)
      {
        e.preventDefault();
        const data = await dispatch(changePassword(profileId, input)).catch(swal({
          text: "La contraseña ingresada es incorrecta.",
          icon: "warning",
        }));
        
        if(data !== true)
        {
          swal({
            text: "Su contraseña ha sido actualizada.",
            icon: "success",
          });
          navigate(`/profile/editProfile/${profileId}`);
        };
      }
      else
      {
        e.preventDefault();
        swal({
          text: "La contraseña ingresada es incorrecta.",
          icon: "warning",
        });
      };
    };
  };
  
  return(
    <div className={s.container_login_form}>
      <h5>CAMBIAR CONTRASEÑA</h5>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} className={errors.oldPassword ? s.Alert : s.Inputs} type={oldPassword ? "text" : "password"} placeholder="Ingrese su contraseña actual" name="oldPassword"/>
        {
          errors.oldPassword && errors.oldPassword
        }
        <button className={s.ShowOldPassword} onClick={handleShowOldPassword} type="button">
          {
            oldPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />
          }
        </button>
        
        <input onChange={handleChange} className={errors.password ? s.Alert : s.Inputs} type={password ? "text" : "password"} placeholder="Ingrese su contraseña nueva" name="password"/>
        {
          errors.password && errors.password
        }
        
        <button className={s.ShowPassword} onClick={handleShowPassword} type="button">
          {
            password ? <AiOutlineEyeInvisible /> : <AiOutlineEye />
          }
        </button>
        
        <input onChange={handleChange} className={errors.repeatPassword ? s.Alert : s.Inputs} type={repeatPassword ? "text" : "password"} placeholder="Repita su contraseña nueva" name="repeatPassword"/>
        {
          errors.repeatPassword && errors.repeatPassword
        }
        
        <button className={s.ShowRepeatPassword} onClick={handleShowRepeatPassword} type="button">
          {
            repeatPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
          }
        </button>
        <button type="submit" className={s.login}>Cambiar</button>
      </form>
    </div>
  );
}


export default ChangePassword;