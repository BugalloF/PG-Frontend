import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteUser } from "../../../redux/actions";
import { ImageProfile } from "../../imageprofile/imageprofile";
import s from "../cardprofile/cardprofile.module.css"


const CardProfile = ({userId, userName, userImg, firstName, lastName, email, country,}) => {
    const dispatch = useDispatch()
    return (
        <div>
             <ul className={s.list}>
                <Link to={`/profile/${userId}`}><li className={s.profile}><ImageProfile image={userImg}/>  {userName}</li></Link>
                <li>{firstName} {lastName}</li>
                <li>{email}</li>
                <li><button 
                onClick={() => {
                    dispatch(DeleteUser(userId))
                }} >x</button></li>
                
            </ul>
        </div>
    )

}


export default CardProfile