import { Link } from "react-router-dom";
import React from "react";
import s from "./card.module.css";
import { ImageProfile } from "../imageprofile/imageprofile";
import { useDispatch } from "react-redux";
import { CleanDetail, CleanProfile } from "../../redux/actions";

const Card = ({postId, img, userId, userName, userImg, country, price, title}) => {
  const dispatch = useDispatch()
  //en el return, vamos a verificar que la constante json del usuario tenga datos, asi renderiza la carta, si no, no la renderiza aun
  return (
    <div className={s.Card}>
      <Link
      onClick={() => {}}
      to={`/post/${postId}`} className={s.Link}>
        <img src={img} alt="imagen" className={s.Image} />
      </Link>
      
      <div className={s.UserName}>
        <div className={s.Left}>
          <Link to={`/profile/${userId}`}>
            <ImageProfile image={userImg} />{" "}
          </Link>
          <ol>
            <li>{userName}</li>
            <li>{country}</li>
          </ol>
        </div>
        <div className={s.Right}>
          <span className={s.Price}>${price}</span>
          <h5>{title}</h5>
        </div>
      </div>
    </div>
  );
};


export default Card;