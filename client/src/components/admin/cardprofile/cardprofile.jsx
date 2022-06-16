import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { banUser, CleanUsers, DeleteUser, resetPage } from "../../../redux/actions";
import { ImageProfile } from "../../imageprofile/imageprofile";
import s from "../cardprofile/cardprofile.module.css"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from 'sweetalert'
const loggedUser = window.localStorage.getItem("userData");
let ahora = new Date().toISOString().slice(0, 10)
const CardProfile = ({userId, userName, userImg, firstName, lastName, email, ban,banTime}) => {
    const dispatch = useDispatch()
    function handleDelete(e){
        swal({
          title: "¿Estás seguro que quieres eliminar el perfil?",
          text: "No podrás recuperarlo más tarde",
          icon: "warning",
          buttons: [
            'No',
            'Si'
          ],
          dangerMode: true,
        }).then(function(isConfirm) {
          if (isConfirm) {
            dispatch(DeleteUser(userId))
            swal({
              text: 'Usuario eliminado correctamente!',
              icon: 'success'
            })
          }
        })
      }
    // console.log('ahoraaaa',ahora)
    // console.log('holaaaa',banTime)
    return (
        <div>
             <ul className={s.list}>
                <NavLink className={s.link} to={`/profile/${userId}`}><li className={s.profile}><ImageProfile image={userImg}/><p>{userName}</p></li></NavLink>
                <li><p>{firstName} {lastName}</p></li>
                <li><p>{email}</p></li>
                <li><div className={s.button} 
                onClick={() => {
                    handleDelete()
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