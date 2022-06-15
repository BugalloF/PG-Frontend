// Dependencies
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart , faHeartCrack} from "@fortawesome/free-solid-svg-icons";
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
        <p>{props.user}</p>
		        <ImageProfile image={props.profile.img} bigSize={true}/>
         
		      </div>
        <h1 className={s.title}>{props.title}</h1>
      
          <div className={s.PriceZone}>
          <h1>$ {props.price}</h1>
          </div>
         
          <p>{props.description}</p>
          <div className={s.paypal}>
          <Paypal idPost={props.idPost} price={props.price} description={props.description} title={props.title} idSeller={props.profileId} userSeller={props.user} userPayer={userDataJson?.userName} email={props.emailSeller} />
          <div className={s.buttons}>
        

        { 
          userDataJson!== null ? props.isLiked === false ? 
            <button
             className={s.likes}
             onClick={handlerOnClick}>
                <FontAwesomeIcon  icon={faHeart} className={s.icon}  /> {props.likes}
           
            </button>
     
            :
              <div>
                <button 
                className={s.likes}
                onClick={handlerOnDelete}>
             
                    <FontAwesomeIcon icon={faHeart} className={s.iconilike}  /> {props.likes}
          
                </button>
              </div>
            :
            <button onClick={handlerOnLogin}>
            <span>
              <FontAwesomeIcon icon={faHeart} className={s.icon}  /> {props.likes}
            </span>
          </button>
        }
        <div>
          {
            props.profileId === id ?
            <div className={s.EditButton}>
              <NavLink to={`/edit/${props.idPost}`} style={{textDecoration: "none"}}>
                <button>Editar</button>
              </NavLink>
              <button onClick={handleDelete}>Eliminar</button>
            </div>
            :
            null
          }
        </div>
    
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