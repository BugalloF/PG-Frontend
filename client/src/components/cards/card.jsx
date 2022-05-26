import { Link } from "react-router-dom";
import React from "react";
import s from "./card.module.css";
const Card = ({postId, img, userId, userName}) => {



  //en el return, vamos a verificar que la constante json del usuario tenga datos, asi renderiza la carta, si no, no la renderiza aun
  return userId ? (
    <div className={s.Card}>
      <Link to ={`/profile/posts/${postId}`}>
        <img src={img} alt="imagen" className={s.Image} />
      </Link>
      
      <Link to={`/profile/posts/${userId}`}>
        <div className={s.UserName}>
          <img src="https://rochester.kidsoutandabout.com/sites/default/files/digitalartadvanced.png" alt="icono" />
          <h1>{userName}</h1>
        </div>
      </Link>
    </div>
  ) : null;
};
export default Card;
