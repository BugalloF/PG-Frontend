import React from "react";
import s from '../imageprofile/imageprofile.module.css'


export function ImageProfile(props) {
    return (
        <div>
            <div className={s.container_imageprofile}><img src={props.image}/></div>
        </div>
    )
}