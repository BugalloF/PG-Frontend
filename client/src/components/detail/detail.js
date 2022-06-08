// Dependencies
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart} from "@fortawesome/free-solid-svg-icons";
// Files
import {ImageProfile} from "../imageprofile/imageprofile";
import Paypal from "../paypal/paypal";
import s from "./detail.module.css";
import { useDispatch } from "react-redux";
import { addLike, deleteLike } from "../../redux/actions";

export function Detail(props) {
  const dispatch = useDispatch();
  const loggedUser = window.localStorage.getItem("userData");
  const userDataJson = JSON.parse(loggedUser);
  // console.log('aaaaaaaa',typeof(userDataJson))

  
   function handlerOnClick (e){
    e.preventDefault()
    dispatch(addLike(loggedUser,props.idPost))
    // console.log('me apreto')
  }
  function handlerOnDelete (e){
    e.preventDefault()
    dispatch(deleteLike(loggedUser,props.idPost))
    // console.log('me apreto')
  }
  // console.log('PROPSSSSSS',props.isLogged)
  // console.log('Userdatajson',userDataJson)
 
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
          <Paypal
            idPost={props.idPost}
            price={props.price}
            description={props.description}
            title={props.title}
          />
          {/* <button className={s.btn_purchase}><FontAwesomeIcon icon={faCartShopping} className={s.icon}/> COMPRAR</button> */}
          {/* <button className={s.btn_fav}>
            <FontAwesomeIcon icon={faHeart} className={s.icon} /> Agregar a favorito
          </button> */}
          { userDataJson!== null ? props.isLiked===false ? 
          <button onClick={handlerOnClick}>
            <span>
            <FontAwesomeIcon icon={faHeart} className={s.icon}  /> {props.likes}
          </span>

          </button>
          :
          <div>
            <button onClick={handlerOnDelete}>
            <span>
            <FontAwesomeIcon icon={faHeart} className={s.icon}  /> {props.likes}
          </span>

          </button>
          </div>
          :
          <div>
            NO ESTAS REGISTRADO PARA PONER ME GUSTAS
          </div>
          }
        </div>
      </div>
    </div>
  );
};