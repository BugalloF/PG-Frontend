// Dependencies
import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// Files
import {faUser, faUsers, faBagShopping, faPlus, faRightFromBracket, faLaptopCode} from "@fortawesome/free-solid-svg-icons";

const Usermenu = ({userID}) => {
  //en el return, vamos a verificar que la constante json del usuario tenga datos, asi renderiza la carta, si no, no la renderiza aun
  const loggedUser = window.localStorage.getItem("userData");
  const userDataJson = JSON.parse(loggedUser);
  
  function handleLogout()
  {
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={s.UserMenu}>
     <ul className={s.Lista}>
        <Link to={`/profile/${userID}`} style={{textDecoration: 'none'}}>
          <li>
            <FontAwesomeIcon icon={faUser} className={s.icon} />Mi perfil
          </li>
        </Link>
        <Link to={`/create`} style={{textDecoration: 'none'}}>
          <li>
            <FontAwesomeIcon icon={faPlus} className={s.icon} />Publicar
          </li>
        </Link>
       { userDataJson.is_Admin ?
       <Link to={`/paneladm`} style={{textDecoration: 'none'}}>
          <li>
            <FontAwesomeIcon icon={faLaptopCode} className={s.icon}  /> Panel admin
          </li>
        </Link>:null}
        <Link to={`/aboutus`} style={{textDecoration: 'none'}}>
          <li>
            <FontAwesomeIcon icon={faUsers} className={s.icon} />Sobre nosotros
          </li>
        </Link>
          <li onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} className={s.icon} />Desconectarse
          </li>
     </ul>
    </div>
  );
};


export default Usermenu;