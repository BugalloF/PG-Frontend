import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import s from './detail.module.css';
import Profile from '../profile/profile'




export default function Detail(props) {


  return(
  	<div className={s.container}>
      <div className={s.container_detail}>
      	<img src={props.image} alt="IMAGEN" className={s.img}/>
      	<div className={s.container_rigth}>

	      	<Profile userName={props.user.nombre} photo={props.user.perfil} follow={true} />

	      	<p>{props.description}</p>     		
      	</div>

      </div>
      <div className={s.buttons}>
      	<button className={s.btn_comment}><FontAwesomeIcon icon={faUser} className={s.icon}/> Comentarios: {props.amountComm} </button>
      	
      	<div className={s.buttons_rigth}>
	      	<button className={s.btn_purchase}><FontAwesomeIcon icon={faCartShopping} className={s.icon}/> COMPRAR</button>
	      	<button className={s.btn_fav}><FontAwesomeIcon icon={faHeart} className={s.icon}/> Agregar a favorito</button>
	      	<span><FontAwesomeIcon icon={faHeart} className={s.icon} /> 120</span>
      	</div>

      </div>
    </div>
  )
}