// Dependencies
import React, {useEffect} from "react";
// Files
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import LoginCarousel from "../../components/loginpage/loginCarousel";
import s from './RegisterPage.module.css';


function RegisterPage()
{
    //objeto de prueba para carta
    useEffect(() => {}, []);
    
    return (
        <div className={s.LoginPage}>
            <RegisterForm/>
            <LoginCarousel/>
        </div>
    );
};


export default RegisterPage;