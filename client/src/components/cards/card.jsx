import { Link } from "react-router-dom";
import React from "react";
import s from "./card.module.css";
import { ImageProfile } from "../imageprofile/imageprofile";


const Card = ({postId, img, userId, userName, userImg}) => {
 
  
  return userId ? (
    <div  className={s.Card}>
      <Link to ={`/post/${postId}`}>
        {<img  src={img} alt="imagen" className={s.Image} />}
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
