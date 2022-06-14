import React from "react";
import s from "../cardtransactions/cardtransactions.module.css"
import { useDispatch } from "react-redux";
import { faCashRegister } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  CleanTransactions, PutTransactions } from "../../../redux/actions";
import { resetPage } from "../../../redux/actions";



const  CardTrans = ({id,userSeller,userPayer,title,email,price,isPayed,createdAt}) => {
    const dispatch = useDispatch();
    return (
        <div className={s.container}>
            <ul className={s.list}>
                <li><p>{id}</p></li>
                <li><p>{userSeller}</p></li>
                <li><p>{userPayer}</p></li>
                <li><p>${price}</p></li>
                <li><p>{title}</p></li>
                <li><p>{email}</p></li> 
                <li><p>{createdAt.slice(0,10)}</p></li>

                <li>{!isPayed ? <div
                className={s.button}
                onClick={() => {
                    dispatch(resetPage())
                    dispatch(CleanTransactions())
                    dispatch(PutTransactions(id))
                }}><p>Confirmar pago</p></div>: <p>Pagado</p>}</li>
                
            </ul>
        
            
        </div>
    )
}

export default CardTrans