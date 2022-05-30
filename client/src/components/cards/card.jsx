import { Link } from "react-router-dom";
import React from "react";
import s from "./card.module.css";
import { ImageProfile } from "../imageprofile/imageprofile";

const Card = ({postId, img, userId, userName, userImg}) => {
  //en el return, vamos a verificar que la constante json del usuario tenga datos, asi renderiza la carta, si no, no la renderiza aun
  
  return userId ? (
    <div className={s.Card}>
      <Link to ={`/post/${postId}`}>
        <img src={img} alt="imagen" className={s.Image} />
      </Link>
      
      <Link to={`/profile/${userId}`}>
        <div className={s.UserName}>
          <ImageProfile image={userImg} name={userName}/>
        </div>
      </Link>
    </div>
  ) : null;
};
export default Card;
