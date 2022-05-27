import React, { useState } from "react";
import LoginCarousel from "../../components/loginpage/loginCarousel";
import {LoginForm} from '../../components/loginform/loginform'
import s from './loginpage.module.css'


const LoginPage = () => {
    //objeto de prueba para carta

    React.useEffect(() => {
    }, []);
    return (
        <div className={s.LoginPage}>
            {/* <LoginForm></LoginForm> */}
            <LoginCarousel></LoginCarousel>
        </div>
    );
};
export default LoginPage;