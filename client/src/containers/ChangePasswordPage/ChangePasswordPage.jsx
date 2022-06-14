// Dependencies
import React, {useEffect} from "react";
// Files
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import LoginCarousel from "../../components/loginpage/loginCarousel";
import s from './ChangePasswordPage.module.css';


function ChangePasswordPage()
{
    //objeto de prueba para carta
    useEffect(() => {}, []);
    
    return (
        <div className={s.LoginPage}>
            <ChangePassword/>
            <LoginCarousel/>
        </div>
    );
};


export default ChangePasswordPage;