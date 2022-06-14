import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { banUser, DeleteUser } from "../../../redux/actions";
import { ImageProfile } from "../../imageprofile/imageprofile";
import s from "../cardprofile/cardprofile.module.css"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const loggedUser = window.localStorage.getItem("userData");
let ahora = new Date().toISOString().slice(0, 10)


const CardProfile = ({userId, userName, userImg, firstName, lastName, email, ban,banTime}) => {

    // console.log('ahoraaaa',ahora)
    const dispatch = useDispatch()
    // console.log('holaaaa',banTime)
    return (
        <div>
             <ul className={s.list}>
                <NavLink className={s.link} to={`/profile/${userId}`}><li className={s.profile}><ImageProfile image={userImg}/><p>{userName}</p></li></NavLink>
                <li><p>{firstName} {lastName}</p></li>
                <li><p>{email}</p></li>
                <li><div className={s.button} 
                onClick={() => {
                    dispatch(DeleteUser(userId))
                }} ><FontAwesomeIcon icon={faCircleXmark}/></div></li>
                
                { ban === false ?<li><div
                className={s.buttonban}
                onClick={() => {
                    dispatch(banUser(userId,loggedUser))
                }} >Banear</div></li>: banTime >= ahora ?
                <li><div
                className={s.buttonban} 
                onClick={() => {
                    dispatch(banUser(userId,loggedUser))
                }} >Quitar ban</div></li>
                : null
            }
                <li><p>{banTime}</p></li>
            </ul>
        </div>
    )

}


export default CardProfile