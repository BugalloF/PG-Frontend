import React from "react";
import { Link } from "react-router-dom";
import s from './landingPage.module.css';
import Filters from "../../components/filters/filters";

const LandingPage = () => {
    React.useEffect(() => {
    }, []);
    
    return (
        <div className={s.LandingPage}>
            <div className={s.LandingImg}>
            <img src="https://as2.ftcdn.net/v2/jpg/02/45/09/63/1000_F_245096333_OEdpsErCNOq9BAfo0IFSYHqJbGHmSKih.jpg" alt="" />
            <div></div>
            <h1>NOVEDADES DE LA SEMANA</h1>
            <h1>COMIENZA A EXPLORAR AHORA</h1>
            <Link to='/feed' style={{textDecoration: 'none'}}>Explorar</Link>
            </div>
            <div className={s.Filters}>
              <Filters></Filters>
            </div>
        </div>
    );
};


export default LandingPage;