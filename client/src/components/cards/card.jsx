import { NavLink } from "react-router-dom";
import React from "react";
import s from "./card.module.css";
import { ImageProfile } from "../imageprofile/imageprofile";
const Card = ({postId, img, userId, userName, userImg, country, price, title}) => {
  //en el return, vamos a verificar que la constante json del usuario tenga datos, asi renderiza la carta, si no, no la renderiza aun
  return (
    <div className={s.Card}>
      <NavLink
      onClick={() => {}}
      to={`/post/${postId}`} className={s.Link}>
        <img src={img} alt="imagen" className={s.Image} />
      </NavLink>
      
      <div className={s.UserName}>
        <div className={s.Left}>
        <span className={s.Price}>${price}</span>

        </div>
        <div className={s.Right}>
        <h5 className={s.title2}>{title}</h5>
        
      <div className={s.Profile}>
      <NavLink
      style={{textDecoration: 'none'}}
      to={`/profile/${userId}`}>
           <div className={s.name}>{userName}</div>          
          </NavLink>
      </div>
     
        </div>
      </div>
    </div>
  );
};


export default Card;