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
    const navigate = useNavigate();
    
    useEffect(() => dispatch(getUsers()), [dispatch]);
    
    function validate(input)
    {
        const errors = {};
        const foundUsername = users.filter(e => e.userName === input.userName);
        const foundEmail = users.filter(e => e.email === input.email);

        if(!input.name)
        {
            errors.name = <font color="red">*</font>;
        }
        else if(!input.lastName)
        {
            errors.lastName = <font color="red">*</font>;
        }
        else if(!input.userName)
        {
            errors.userName = <font color="red">*</font>;
        }
        else if(!input.email)
        {
            errors.email = <font color="red">*</font>;
        }
        else if(foundUsername.length)
        {
            errors.userName = <p className={s.Alert}>Este nombre de usuario no está disponible. Por favor, intente con otro.</p>;
        }
        else if(foundEmail.length)
        {
            errors.email = <p className={s.Alert}>Este correo electrónico ya está en uso disponible. Por favor, intente con otro.</p>;
        }
        else if(!input.password)
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
        setErrors(validate({...input, [e.target.name] : e.target.value}));
    };
    
    function handleShowPassword(e)
    {
        e.preventDefault(e);
        setPassword(password => !password);
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
            <h3>Registrarte es rápido y fácil.</h3>
            <form onSubmit={handleSubmit}>
                <input onChange={e => handleChange(e)} type="text" placeholder="Nombre" name="name"/>
                {
                    errors.name && errors.name
                }
                <input onChange={e => handleChange(e)} type="text" placeholder="Apellido" name="lastName"/>
                {
                    errors.lastName && errors.lastName
                }
                <input onChange={e => handleChange(e)} type="text" placeholder="Nombre de usuario" name="userName"/>
                {
                    errors.userName && errors.userName
                }
                <input onChange={e => handleChange(e)} type="email" placeholder="Correo electrónico" name="email"/>
                {
                    errors.email && errors.email
                }
                <input onChange={e => handleChange(e)} type={password ? "text" : "password"} placeholder="Contraseña" name="password"/>
                {
                    errors.password && errors.password
                }
                
                <button className={s.ShowPassword} onClick={handleShowPassword} type="button">
                    {
                        password ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                    }
                </button>
                
                <input onChange={e => handleChange(e)} type="password" placeholder="Repita su contraseña" name="repeatPassword"/>
                {
                    errors.repeatPassword && errors.repeatPassword
                }
                
                <div className={s.options}>
                  <Link to="/login" className={s.noAccount}>Ya tengo una cuenta</Link>
                </div>
                
                <button type="submit" className={s.login}>Registrarte</button>
            </form>
        </div>
    );
};


export default RegisterForm;