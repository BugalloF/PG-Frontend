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
import { addLike, CleanStatus, DeleteArtwork, deleteLike } from "../../redux/actions";

export function Detail(props) {
  const dispatch = useDispatch();
  const status = useSelector(state => state.status);
  const loggedUser = window.localStorage.getItem("userData");
  const userDataJson = JSON.parse(loggedUser);

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
    dispatch(DeleteArtwork(props.idPost))
  }

  const navigate = useNavigate();

  React.useEffect(() => {
    if(status === 200){
     swal("La obra fue eliminada correctamente!");
     navigate("/");
    }
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
          <p>{props.description}</p>
        </div>
      </div>
      <div className={s.buttons}>
        <div className={s.buttons_rigth}>
          <Paypal idPost={props.idPost} price={props.price} description={props.description} title={props.title} />
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
              props.profileId === userDataJson.id ? <div> <NavLink to={`/edit/${props.idPost}`}><button>Editar</button></NavLink> <button onClick={handleDelete}>Eliminar</button> </div>: null
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