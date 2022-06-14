import React from "react";
import { ImageProfile } from "../../imageprofile/imageprofile";
import s from "../cardsart/cardadm.module.css"
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CleanPosts, DeleteArtwork, resetPage } from "../../../redux/actions";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const  CardAdm = ({userName, userImg, img, price, title, userId,category,likes, postId}) => {
    const dispatch = useDispatch();
    return (
        <div className={s.container}>
            <ul className={s.list}>
                <NavLink className={s.link}  to={`/profile/${userId}`}><li className={s.profile}><ImageProfile image={userImg}/>  <p>{userName}</p></li></NavLink>
                <li><p>${price}</p></li>
                <li><p>{title}</p></li>
                <li><p>{category}</p></li>
                <li><p>{likes}</p></li>
                <NavLink to={`/post/${postId}`}><li><img src={img} alt="img-art" className={s.imgArt} /></li></NavLink>
                <li><div
                className={s.button}
                onClick={() => {
                    dispatch(resetPage())
                    dispatch(CleanPosts())
                    dispatch(DeleteArtwork(postId))

                }}><FontAwesomeIcon icon={faCircleXmark}/></div></li>
                
            </ul>
        
            
        </div>
    )
}

export default CardAdm