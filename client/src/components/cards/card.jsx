import { Link } from "react-router-dom";
import React from "react";
import s from "./card.module.css";
import LoginCarousel from "../loginpage/loginCarousel";
import { ImageProfile } from "../imageprofile/imageprofile";

const image ="https://rochester.kidsoutandabout.com/sites/default/files/digitalartadvanced.png"

const Card = ({ post }) => {



  //en el return, vamos a verificar que la constante json del usuario tenga datos, asi renderiza la carta, si no, no la renderiza aun
  return post.UserId ? (
    <div className={s.Card}>
      <Link to ='/profile/posts/post.id'>
        <img src={post.Image} alt="imagen" className={s.Image} />
      </Link>
      
      <Link to="/profile/post.userid">
        <div className={s.UserName}>
          <ImageProfile image={image}/>
          <h1>{post.UserName}</h1>
        </div>
      </Link>
    </div>
  ) : null;
};
export default Card;
