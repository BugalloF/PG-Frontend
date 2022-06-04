import { Link } from "react-router-dom";
import React from "react";
import s from "./card.module.css";
import { ImageProfile } from "../imageprofile/imageprofile";

const Card = ({postId, img, userId, userName, userImg, country, price, title}) => {
  //en el return, vamos a verificar que la constante json del usuario tenga datos, asi renderiza la carta, si no, no la renderiza aun
  console.log("IMAGEN", img)
  return (
    <div className={s.Card}>
      <Link to ={`/post/${postId}`} className={s.Link}>
        <img src={img} alt="imagen" className={s.Image} />
      </Link>

        <div className={s.UserName}>
      <Link to={`/profile/${userId}`} className={s.Link}>
          <ImageProfile image={userImg} name={userName} country={country}/>
      </Link>        
          <span className={s.Price}>${price}</span>        
        </div>

      <span className={s.Title}>{title}</span>      
    </div>
  );
};
export default Card;
