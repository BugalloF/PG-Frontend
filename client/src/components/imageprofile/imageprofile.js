import React, { useEffect, useState } from "react";
import s from '../imageprofile/imageprofile.module.css'



export function ImageProfile({image,bigSize,name,country}) {


  var [size, setSize] = useState(s.big_image)
 
  useEffect(()=>{
     
    if(!bigSize)  setSize(s.litle_image)
    
  },[])


    
    return (
     
        <div className={s.container}>
            
            <img className={size} src={image}/>
            <div className={s.text}>
              {name ? <h1>{name}</h1> : null}
              <span>{country}</span>
            </div>
            
        </div>
    )
}