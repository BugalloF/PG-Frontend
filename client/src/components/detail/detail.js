// Dependencies
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart , faHeartCrack} from "@fortawesome/free-solid-svg-icons";
import {NavLink,useNavigate} from 'react-router-dom';
import swal from "sweetalert";
// Files
import {ImageProfile} from "../imageprofile/imageprofile";
import Paypal from "../paypal/paypal";
import s from "./detail.module.css";
import { useDispatch,useSelector } from "react-redux";
import { addLike, CleanDetail, CleanProfile, CleanStatus, DeleteArtwork, deleteLike } from "../../redux/actions";

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
        navigate("/");
        swal({
          text: 'Publicación eliminada correctamente!',
          icon: 'success'
        })
      } else {
        swal("Cancelado", "Tu obra no fue eliminada", "error");
      }
    })
  }

  const navigate = useNavigate();

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
		        <ImageProfile image={props.profile.img} bigSize={true}/>
              <p>{props.user}</p>
		      </div>
          <p>{props.title}</p>
          <p>{props.description}</p>
          <p>$ {props.price}</p>
        </div>
      </div>
      <div className={s.buttons}>
        <div className={s.buttons_rigth}>
          <div className={s.Paypal}>
            pagar con paypal
          <Paypal idPost={props.idPost} price={props.price} description={props.description} title={props.title} idSeller={props.profileId} userSeller={props.user} userPayer={userDataJson.userName} email={props.emailSeller} />
          </div>
          { 
            userDataJson!== null ? props.isLiked === false ? 
              <button onClick={handlerOnClick}>
                <span>
                  <FontAwesomeIcon icon={faHeart} className={s.icon}  /> {props.likes}
                </span>
              </button>
              :
                <div>
                  <button onClick={handlerOnDelete}>
                    <span>
                      <FontAwesomeIcon icon={faHeartCrack} className={s.icon}  /> {props.likes}
                    </span>
                  </button>
                </div>
              :
                <div>
                  NO ESTAS REGISTRADO PARA PONER ME GUSTAS
                </div>
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
  );
  }
  else{
    return(<p>cargando...</p>)
  }
};