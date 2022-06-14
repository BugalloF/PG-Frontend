// Dependencies
import React, {useEffect} from "react";
// Files
import LoginForm from "../../components/LoginForm/LoginForm";
import LoginCarousel from "../../components/loginpage/loginCarousel";
import s from './loginpage.module.css';


function LoginPage()
{
    //objeto de prueba para carta
    useEffect(() => {}, []);
    
    return (
        <div className={s.LoginPage}>
            <LoginForm/>
            <LoginCarousel/>
        </div>
    );
};


export default LoginPage;