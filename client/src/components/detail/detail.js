// Dependencies
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faCartShopping, faHeart} from "@fortawesome/free-solid-svg-icons";
// Files
import {ImageProfile} from "../imageprofile/imageprofile";
import Paypal from "../paypal/paypal";
import s from "./detail.module.css";


export function Detail(props) {
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
          <button className={s.btn_fav}>
            <FontAwesomeIcon icon={faHeart} className={s.icon} /> Agregar a favorito
          </button>
          <span>
            <FontAwesomeIcon icon={faHeart} className={s.icon} /> {props.likes}
          </span>
        </div>
      </div>
    </div>
  );
};