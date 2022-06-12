// Dependencies
import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import swal from "sweetalert";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";
// Files
import {getUsers, login} from "../../redux/actions/index";
import s from "./LoginForm.module.css";


function LoginForm()
{
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        user: "",
        password: "",
    });
    const [/*user*/, setUser] = useState(null);
    // Show or hide password
    const [password, setPassword] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => dispatch(getUsers()), [dispatch]);
    
    function validate(input)
    {
        const errors = {};
        
        if(!input.user)
        {
            errors.user = <p></p>;
        }
        else if(!input.password)
        {
            errors.password = <p></p>;
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
    
    async function handleSubmit(e)
    {
        const foundUsername = users.filter(e => e.userName === input.user);
        const foundEmail = users.filter(e => e.email === input.user);
        
        if(Object.keys(validate(input)).length > 0)
        {
            e.preventDefault();
            swal("Por favor, complete todos los campos correctamente.");
        }
        else
        {
            if((foundUsername.length || foundEmail.length))
            {
                e.preventDefault();
                const data = await dispatch(login(input)).catch(error => console.log(error));
                
                if(data === undefined || data === null)
                {
                    swal("Usuario o contraseña incorrectos.");
                }
                else
                {
                    const payload = data.payload;
                    const userData =
                    {
                        id: payload.foundUser[0].id,
                        userName: payload.foundUser[0].userName,
                        email: payload.foundUser[0].email,
                        token: payload.token,
                        img: payload.foundUser[0].img,
                        is_Admin: payload.foundUser[0].is_Admin,
                    };
                    
                    window.localStorage.setItem("userData", JSON.stringify(userData));
                    
                    // No se aplica porque esta dentro de una async function
                    setInput({
                        user: "",
                        password: "",
                    });
                    
                    setUser(userData);
                    // ------------------------------------------------------
                    swal("Loged.");
                    navigate("/");
                };
            }
            else
            {
                e.preventDefault();
                swal("Usuario o contraseña incorrectos.");
            };
        };
    };
    
    return(
        <div className={s.container_login_form}>
            <h5>BIENVENIDO, POR FAVOR INICIA SESIÓN</h5>
            <form onSubmit={handleSubmit}>
                <input className={errors.user ? s.Alert : s.Inputs} type="text" placeholder="Nombre de usuario o correo electrónico" name="user" onChange={handleChange} />
                {
                    errors.user && errors.user
                }
                <input className={errors.password ? s.Alert : s.Inputs} type={password ? "text" : "password"} placeholder="Contraseña" name="password" onChange={handleChange}  />
                {
                    errors.password && errors.password
                }
                
                <button className={s.ShowPassword} onClick={handleShowPassword} type="button">
                        {
                            password ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                        }
                </button>
                
                <div className={s.options}>
                  <Link to="/register" className={s.noAccount}>No tengo una cuenta</Link>
                  <Link to="/forgot" className={s.noAccount}>Olvidaste tu contraseña?</Link>
                </div>
                
                <button type="submit" className={s.login}>Iniciar sesión</button>
            </form>
        </div>
    );
};


export default LoginForm;