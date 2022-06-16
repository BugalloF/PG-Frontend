// Dependencies
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart , faHeartCrack,faPenToSquare,faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {NavLink,useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import swal from "sweetalert";
// Files
import {ImageProfile} from "../imageprofile/imageprofile";
import Paypal from "../paypal/paypal";
import s from "./detail.module.css";
import { addLike, CleanStatus, DeleteArtwork, deleteLike } from "../../redux/actions";

export function Detail(props) {
  const dispatch = useDispatch();
  const status = useSelector(state => state.status);
  const loggedUser = window.localStorage.getItem("userData");
  const userDataJson = JSON.parse(loggedUser);
  const id = userDataJson ? userDataJson.id : "";

  function handlerOnClick (e){
    e.preventDefault()
    dispatch(addLike(loggedUser,props.idPost))
  }
  function handlerOnDelete (e){
    e.preventDefault()
    dispatch(deleteLike(loggedUser,props.idPost))
  }
  function handleDelete(e){
    e.preventDefault()
    swal({
      title: "¿Estás seguro que quieres eliminar tu publicación?",
      text: "No podrás recuperarla más tarde",
      icon: "warning",
      buttons: [
        'No',
        'Si'
      ],
      dangerMode: true,
    }).then(function(isConfirm) {
      if (isConfirm) {
        dispatch(DeleteArtwork(props.idPost))
        navigate("/feed");
        swal({
          text: 'Publicación eliminada correctamente!',
          icon: 'success'
        })
      }
    })
  }
  const navigate = useNavigate();

  function handlerOnLogin(e){
    e.preventDefault()
    swal({
      text: "Debes iniciar sesión para realizar esta acción.",
      icon: "warning",
      buttons: [
        'Cancelar',
        'Iniciar sesión'
      ],
    }).then(function(isConfirm) {
      if (isConfirm) {
        navigate("/login");
      } 
    })
  }
  
  React.useEffect(() => {
    dispatch(CleanStatus())
  }, [status]);

  
  if(props !== undefined){
  return(
    <div className={s.container}>
      <div className={s.container_detail}>
        
        <img src={props.image} alt="IMAGEN" className={s.img} />

 
        
        <div className={s.container_rigth}>
        <div className={s.ProfileZone}>
        {
          userDataJson ? 
       <NavLink
       className={s.profile1}
        to={`/profile/${props.profileId}`}
       >
       <p>{props.user}</p>
       <ImageProfile image={props.profile.img} />
       </NavLink>:
       <NavLink
       className={s.profile1}
       onClick={handlerOnLogin}
        to={`/profile/${props.profileId}`}
       >
       <p>{props.user}</p>
       <ImageProfile image={props.profile.img} />
       </NavLink>
       
      }
     
        
         
		      </div>
        <h1 className={s.title}>{props.title}</h1>
      
          <div className={s.PriceZone}>
          <h1>$ {props.price}</h1>
          </div>
         
          <p>{props.description}</p>
          <div className={s.paypal}>
          {props.profileId !== id ?
          <Paypal idPost={props.idPost} price={props.price} description={props.description} title={props.title} idSeller={props.profileId} userSeller={props.user} userPayer={userDataJson?.userName} email={props.emailSeller} />
          :
          null
        }
          <div className={s.buttons}>
        

        { 
          userDataJson!== null ? props.isLiked === false ? 
            <div className={s.row}>
            <button
             className={s.likes}
             onClick={handlerOnClick}>
                <FontAwesomeIcon  icon={faHeart} className={s.icon}  /> {props.likes}
           
            </button>
            {
            props.profileId === id ?
            <div className={s.likes}>
              <NavLink to={`/edit/${props.idPost}`} style={{textDecoration: "none"}}>
              <FontAwesomeIcon icon={faPenToSquare} className={s.icon}  />
              </NavLink>
              <FontAwesomeIcon icon={faTrashCan} onClick={handleDelete} className={s.icon}  />

            </div>
            :
            null
          }
            </div>
     
            :
              <div>
                <button 
                className={s.likes}
                onClick={handlerOnDelete}>
             
                    <FontAwesomeIcon icon={faHeart} className={s.icon}  /> {props.likes}
          
                </button>
              </div>
            :
            <button 
            className={s.likes}
            onClick={handlerOnLogin}>
            <span>
              <FontAwesomeIcon icon={faHeart} className={s.icon}  /> {props.likes}
            </span>
          </button>
        }
        
         
        
    
    </div>

          </div>

    
          
        </div>
      </div>

    </div>
  );
  }
  else{
    return(<p>cargando...</p>)
  }
};