import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { banUser, DeleteUser, unBanUser } from "../../../redux/actions";
import { ImageProfile } from "../../imageprofile/imageprofile";
import s from "../cardprofile/cardprofile.module.css"
const loggedUser = window.localStorage.getItem("userData");
let ahora = new Date().toISOString().slice(0, 10)


const CardBanned = ({userId, userName, userImg, firstName, lastName, email, ban,banTime}) => {
    // console.log('ahoraaaa',ahora)
    const dispatch = useDispatch()
    // console.log('holaaaa',banTime)
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
                
                { ban === false ?<li><button 
                onClick={() => {
                    dispatch(banUser(userId,loggedUser))
                }} >Banear</button></li>: banTime >= ahora ?
                <li><button 
                onClick={() => {
                    dispatch(unBanUser(userId,loggedUser))
                }} >Quitar ban</button></li>
                :
                <div>
                    <li><button 
                onClick={() => {
                    dispatch(unBanUser(userId,loggedUser))
                }} >Quitar ban</button></li>
                    <li>HOY</li>
                    </div>}
                <li>{banTime}</li>
            </ul>
        </div>
    )

}


export default CardBanned