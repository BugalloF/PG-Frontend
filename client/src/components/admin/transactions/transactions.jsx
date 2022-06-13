import React from "react";
import { useDispatch } from "react-redux";
import s from "../cardprofile/cardprofile.module.css"


const CardTransactions = ({price, userSeller, userPayer,  email, title}) => {
    // console.log('ahoraaaa',ahora)
    const dispatch = useDispatch()
    // console.log('holaaaa',banTime)
    return (
        <div>
             <ul className={s.list}>
                <li>{userPayer}</li>
                <li>{userSeller}</li>
                <li>{email}</li>
                <li>{title}</li>
                <li>{price}</li>
            </ul>
        </div>
    )

}


export default CardTransactions