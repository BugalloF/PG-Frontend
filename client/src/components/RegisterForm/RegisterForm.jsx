// Dependencies
import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import swal from "sweetalert";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";
// Files
import {getUsers, register} from "../../redux/actions/index";
import s from "./RegisterForm.module.css";


function RegisterForm()
{
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        repeatPassword: "",
    });
    // Show or hide password
    const [password, setPassword] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => dispatch(getUsers()), [dispatch]);
    
    function validate(input)
    {
        const errors = {};
        const foundUsername = users.filter(e => e.userName === input.userName);
        const foundEmail = users.filter(e => e.email === input.email);
        const regExp= /^[^]+@[^ ]+\.[a-z]{2,3}$/;
        const verifyEmail = regExp.test(input.email);
        
        if(!input.name)
        {
            errors.name = <p></p>;
        }
        else if(!input.lastName)
        {
            errors.lastName = <p></p>;
        }
        else if(!input.userName)
        {
            errors.userName = <p></p>;
        }
        else if(!input.email)
        {
            errors.email = <p></p>;
        }
        else if(foundUsername.length)
        {
            errors.userName = <p className={s.AlertText}>Este nombre de usuario ya está en uso. Por favor, intente con otro.</p>;
        }
        else if(foundEmail.length)
        {
            errors.email = <p className={s.AlertText}>Este correo electrónico ya está en uso. Por favor, intente con otro.</p>;
        }
        else if(!verifyEmail)
        {
            errors.email = <p className={s.AlertText}>Introduzca un correo válido.</p>;
        }
        else if(!input.password)
        {
            errors.password = <p></p>;
        }
        else if(input.password.length < 8)
        {
            errors.password = <p className={s.AlertText}>La contraseña debe contener al menos 8 carácteres.</p>;
        }
        else if(!input.repeatPassword)
        {
            errors.password = <p></p>;
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
        setErrors(validate({...input, [e.target.name] : e.target.value}));
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
    
    function handleSubmit(e)
    {
        if(Object.keys(validate(input)).length > 0)
        {
            e.preventDefault();
            swal("Por favor, complete todos los campos correctamente.");
        }
        else
        {
            e.preventDefault();
            dispatch(register(input));
            setInput({
                name: "",
                lastName: "",
                userName: "",
                email: "",
                password: "",
            });
            swal("El usuario fue creado con éxito!");
            navigate("/login");
        };
    };
    
    return(
        <div className={s.container_login_form}>
            <h1>Crear una cuenta</h1>
            <h3>Registrarte es rápido y fácil.</h3>
            <form onSubmit={handleSubmit}>
                <input onChange={e => handleChange(e)} className={errors.name ? s.Alert : s.Inputs} type="text" placeholder="Nombre" name="name"/>
                {
                    errors.name && errors.name
                }
                <input onChange={e => handleChange(e)} className={errors.lastName ? s.Alert : s.Inputs} type="text" placeholder="Apellido" name="lastName"/>
                {
                    errors.lastName && errors.lastName
                }
                <input onChange={e => handleChange(e)} className={errors.userName ? s.Alert : s.Inputs} type="text" placeholder="Nombre de usuario" name="userName"/>
                {
                    errors.userName && errors.userName
                }
                <input onChange={e => handleChange(e)} className={errors.email ? s.Alert : s.Inputs} placeholder="Correo electrónico" name="email"/>
                {
                    errors.email && errors.email
                }
                <input onChange={e => handleChange(e)} className={errors.password ? s.Alert : s.Inputs} type={password ? "text" : "password"} placeholder="Contraseña" name="password"/>
                {
                    errors.password && errors.password
                }
                
                <button className={s.ShowPassword} onClick={handleShowPassword} type="button">
                    {
                        password ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                    }
                </button>
                
                <input onChange={e => handleChange(e)} className={errors.repeatPassword ? s.Alert : s.Inputs} type={repeatPassword ? "text" : "password"} placeholder="Repita su contraseña" name="repeatPassword"/>
                {
                    errors.repeatPassword && errors.repeatPassword
                }
                
                <button className={s.ShowResetPassword} onClick={handleShowRepeatPassword} type="button">
                    {
                        repeatPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                    }
                </button>
                
                <div className={s.options}>
                  <Link to="/login" className={s.noAccount}>Ya tengo una cuenta</Link>
                </div>
                
                <button type="submit" className={s.login}>Registrarte</button>
            </form>
        </div>
    );
};


export default RegisterForm;