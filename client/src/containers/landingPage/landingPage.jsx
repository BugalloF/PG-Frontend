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
            <img src="https://firebasestorage.googleapis.com/v0/b/prueba-408d2.appspot.com/o/images%2Fcompress%2Fba7f0d9c780f8cc3fb631e341ff68669.jpg?alt=media&token=7d8b9f3c-3895-41fa-859a-ebfe7f471f5a" alt="" />
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