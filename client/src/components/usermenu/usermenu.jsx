import { Link } from "react-router-dom";
import React from "react";
import s from "./usermenu.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUser , faUsers, faBagShopping, faPlus, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";

const Usermenu = ({userID}) => {
  //en el return, vamos a verificar que la constante json del usuario tenga datos, asi renderiza la carta, si no, no la renderiza aun
  return (
    <div className={s.UserMenu}>
     <ul className={s.Lista}>
        <Link to={`/profile/${userID}`} style={{textDecoration: 'none'}}>
          <li>
            <FontAwesomeIcon icon={faUser} className={s.icon}  /> Mi perfil
          </li>
        </Link>
        <Link to={`/create`} style={{textDecoration: 'none'}}>
          <li>
            <FontAwesomeIcon icon={faPlus} className={s.icon}  /> Publicar
          </li>
        </Link>
        <Link to={`/profile/${userID}/compras`} style={{textDecoration: 'none'}}>
          <li>
            <FontAwesomeIcon icon={faBagShopping} className={s.icon}  /> Mis compras
          </li>
        </Link>
        <Link to={`/aboutus`} style={{textDecoration: 'none'}}>
          <li>
            <FontAwesomeIcon icon={faUsers} className={s.icon}  /> Sobre nosotros
          </li>
        </Link>
          <li>
            <FontAwesomeIcon icon={faRightFromBracket} className={s.icon}  /> Desconectarse
          </li>
     </ul>
    </div>
  );
};


export default Usermenu;