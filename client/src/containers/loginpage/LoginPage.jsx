import React from "react";
import LoginCarousel from "../../components/loginpage/loginCarousel";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import s from './loginpage.module.css';


const LoginPage = () => {
    React.useEffect(() => {
    }, []);
    
    return (
        <div className={s.LoginPage}>
            <LoginForm></LoginForm>
            <LoginCarousel></LoginCarousel>
        </div>
    );
};


export default LoginPage;