// Dependencies
import React, {useEffect} from "react";
// Files
import ResetPassword from "../../components/ResetPassword/ResetPassword";
import LoginCarousel from "../../components/loginpage/loginCarousel";
import s from './ResetPage.module.css';


function ResetPage()
{
    //objeto de prueba para carta
    useEffect(() => {}, []);
    
    return (
        <div className={s.LoginPage}>
            <ResetPassword/>
            <LoginCarousel/>
        </div>
    );
};


export default ResetPage;