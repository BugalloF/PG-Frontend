import React from "react";
import s from '../categories/categories.module.css'




export function Categories(props) {
    return(
        <div className={s.container}>
            
            <h3 className={s.name}>{props.name}</h3>
            <img className={s.img} src={props.image}/>
        </div>
    )
}