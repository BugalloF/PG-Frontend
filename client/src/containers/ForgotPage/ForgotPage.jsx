// Dependencies
import React, {useEffect} from "react";
// Files
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";
import LoginCarousel from "../../components/loginpage/loginCarousel";
import s from './ForgotPage.module.css';


function ForgotPage()
{
    //objeto de prueba para carta
    useEffect(() => {}, []);
    
    return (
        <div className={s.LoginPage}>
            <ForgotPassword/>
            <LoginCarousel/>
        </div>
    );
};


export default ForgotPage;