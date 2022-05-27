import React from "react";
import s from './profile.module.css';

export default function Profile(props) {


  return(
    <div className={s.profile}>
        <img src={props.photo} alt="FOTO DE PERFIL"/>
        <p>{props.userName}</p>
        {props.follow?
        	<button>Seguir</button>:null
        }
    </div>
  )
}