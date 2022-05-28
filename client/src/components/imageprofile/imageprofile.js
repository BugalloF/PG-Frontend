import React, { useEffect, useState } from "react";
import s from '../imageprofile/imageprofile.module.css'



export function ImageProfile({image,bigSize,name}) {


  var [size, setSize] = useState(s.big_image)
 
  useEffect(()=>{
     
    if(!bigSize)  setSize(s.litle_image)
    
  },[])


    
    return (
     
        <div className={s.container}>
            
            <img className={size} src={image}/>
            {name ? <h1>{name}</h1> : null}
        </div>
    )
}