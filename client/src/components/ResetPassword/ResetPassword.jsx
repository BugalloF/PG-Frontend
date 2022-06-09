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
    const {id} = useParams();
    const resetToken = window.localStorage.getItem("resetToken");
    const navigate = useNavigate();
    
    
    function validate(input)
    {
        const errors = {};
        
        if(!input.password)
        {
            errors.password = <font color="red">*</font>;
        }
        else if(input.password !== input.repeatPassword)
        {
            errors.repeatPassword = <p className={s.Alert}>Las contraseñas no coinciden.</p>;
        };
        
        return errors;
    };
    
    function handleChange(e)
    {
        setInput({...input, [e.target.name] : e.target.value});
        setErrors(validate({...input,[e.target.name] : e.target.value}));
        // console.log(input);
    };
    
    function handleShowPassword(e)
    {
        e.preventDefault(e);
        setPassword(password => !password);
    };
    
    async function handleSubmit(e)
    {
        if(Object.keys(validate(input)).length > 0)
        {
            e.preventDefault();
            swal("Por favor, ingrese una contraseña correctamente.");
        }
        else
        {
            e.preventDefault();
            const data = await dispatch(resetPassword(id, resetToken, input)).catch(e => swal("El id ingresado no es válido y/o el token ha expirado. Vuelva a intentarlo."));
            // console.log(data);
            
            if(data !== true)
            {
                swal("Su contraseña ha sido actualizada.");
                navigate("/login");
            };
        };
    };
    
    return(
        <div className={s.Container}>
            <form onSubmit={handleSubmit} className={s.Form}>
                <h2>Restablezca su contraseña</h2>
                
                <input onChange={handleChange} type={password ? "text" : "password"} placeholder="Contraseña" name="password"/>
                {
                    errors.password && errors.password
                }
                
                <button onClick={handleShowPassword} type="button">
                    {
                        password ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                    }
                </button>
                
                <input onChange={e => handleChange(e)} type="password" placeholder="Repita su contraseña" name="repeatPassword"/>
                {
                    errors.repeatPassword && errors.repeatPassword
                }
                <button className={s.SubmitButton} type="submit">Restablecer</button>
            </form>
        </div>
    );
};


export default ResetPassword;