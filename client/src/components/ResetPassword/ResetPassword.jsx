// Dependencies
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import swal from "sweetalert";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";
// Files
import {resetPassword} from "../../redux/actions/index";
import s from "./ResetPassword.module.css";


function ResetPassword()
{
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        password: "",
        repeatPassword: "",
    });
    // Show or hide password
    const [password, setPassword] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState(false);
    const {id} = useParams();
    const resetToken = window.localStorage.getItem("resetToken");
    const navigate = useNavigate();
    
    
    function validate(input)
    {
        const errors = {};
        
        if(!input.password)
        {
            errors.password = <font></font>;
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
        setInput({...input, [e.target.name] : e.target.value});
        setErrors(validate({...input,[e.target.name] : e.target.value}));
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
        if(Object.keys(validate(input)).length > 0)
        {
            e.preventDefault();
            swal({
                text: "Por favor, ingrese una contraseña correctamente.",
                icon: "warning",
            });
        }
        else
        {
            e.preventDefault();
            const data = await dispatch(resetPassword(id, resetToken, input)).catch(swal({
                text: "El id ingresado no es válido y/o el token ha expirado. Vuelva a intentarlo.",
                icon: "warning",
            })
            .then(navigate("/forgot")));
            
            if(data !== true)
            {
                swal({
                    text: "Su contraseña ha sido actualizada.",
                    icon: "success",
                });
                navigate("/login");
            };
        };
    };
    
    return(
        <div className={s.container_login_form}>
            <form onSubmit={handleSubmit}>
                <h2>Restablezca su contraseña</h2>
                
                <input onChange={handleChange} className={errors.password ? s.Alert : s.Inputs} type={password ? "text" : "password"} placeholder="Contraseña" name="password"/>
                {
                    errors.password && errors.password
                }
                
                <button className={s.ShowPassword} onClick={handleShowPassword} type="button">
                    {
                        password ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                    }
                </button>
                
                <input onChange={handleChange} className={errors.repeatPassword ? s.Alert : s.Inputs} type={repeatPassword ? "text" : "password"} placeholder="Repita su contraseña" name="repeatPassword"/>
                {
                    errors.repeatPassword && errors.repeatPassword
                }
                
                <button className={s.ShowRepeatPassword} onClick={handleShowRepeatPassword} type="button">
                    {
                        repeatPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                    }
                </button>
                <button className={s.SubmitButton} type="submit">Restablecer</button>
            </form>
        </div>
    );
};


export default ResetPassword;