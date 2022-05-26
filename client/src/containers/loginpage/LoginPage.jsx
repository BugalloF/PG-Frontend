import React, { useState } from "react";
import LoginCarousel from "../../components/loginpage/loginCarousel";
import s from './loginpage.module.css'

const LoginPage = () => {
    //objeto de prueba para carta

    React.useEffect(() => {
    }, []);
    return (
        <div className={s.LoginPage}>
            <LoginCarousel></LoginCarousel>
        </div>
    );
};
export default LoginPage;