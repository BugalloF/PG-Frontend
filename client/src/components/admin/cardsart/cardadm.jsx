import React from "react";
import { ImageProfile } from "../../imageprofile/imageprofile";
import s from "../cardsart/cardadm.module.css"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CleanPosts, DeleteArtwork } from "../../../redux/actions";


const  CardAdm = ({userName, userImg, img, price, title, userId,category,likes, postId}) => {
    const dispatch = useDispatch();
    return (
        <div className={s.container}>
            <ul className={s.list}>
                <Link to={`/profile/${userId}`}><li className={s.profile}><ImageProfile image={userImg}/>  <p>{userName}</p></li></Link>
                <li>${price}</li>
                <li>{title}</li>
                <li>{category}</li>
                <li>{likes}</li>
                <Link to={`/post/${postId}`}><li><img src={img} alt="img-art" className={s.imgArt} /></li></Link>
                <li><button 
                onClick={() => {
                    dispatch(DeleteArtwork(postId))
                }}>x</button></li>
                
            </ul>
        
            
        </div>
    )
}

export default CardAdm