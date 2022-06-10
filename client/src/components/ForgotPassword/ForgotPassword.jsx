// Dependencies
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import swal from "sweetalert";
// Files
import {getUsers, forgotPassword} from "../../redux/actions/index";
import s from "./ForgotPassword.module.css";


function ForgotPassword()
{
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        user: "",
    });
    
    useEffect(() => dispatch(getUsers()), [dispatch]);
    
    function validate(input)
    {
        const errors = {};
        
        if(!input.user)
        {
            errors.user = <font color="red">*</font>;
        };
        
        return errors;
    };
    
    function handleChange(e)
    {
        setInput({...input, [e.target.name] : e.target.value});
        setErrors(validate({...input,[e.target.name] : e.target.value}));
    };
    
    async function handleSubmit(e)
    {
        const foundUsername = users.filter(e => e.userName === input.user);
        const foundEmail = users.filter(e => e.email === input.user);
        
        if(Object.keys(validate(input)).length > 0)
        {
            e.preventDefault();
            swal("Por favor, ingrese un nombre de usuario o correo electrónico.");
        }
        else
        {
            if((foundUsername.length || foundEmail.length))
            {
                e.preventDefault();
                const data = await dispatch(forgotPassword(input)).catch(e => swal("Ocurrió un error. Por favor, intente de nuevo más tarde."));
                
                if(data !== undefined && data !== null && data.payload)
                {
                    swal("Enviamos un correo a su cuenta.");
                    
                    const resetToken =
                    {
                        token: data.payload,
                    };
                    
                    window.localStorage.setItem("resetToken", JSON.stringify(resetToken));
                };
            }
            else
            {
                e.preventDefault();
                swal("No se encontro nignún usuario con ese nombre o correo electrónico.");
            };
        };
    };
    
    return(
        <div className={s.Container}>
            <form onSubmit={handleSubmit} className={s.Form}>
                <h2>Recupere su cuenta</h2>
                
                <input className={s.Input} onChange={handleChange} type="text" placeholder="Nombre de usuario o correo electrónico" name="user"/>
                {
                    errors.user && errors.user
                }
                
                <button className={s.SubmitButton} type="submit">Buscar</button>
            </form>
        </div>
    );
};


export default ForgotPassword;