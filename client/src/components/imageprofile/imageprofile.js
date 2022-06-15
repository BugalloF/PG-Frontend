import React, { useEffect, useState } from "react";
import s from '../imageprofile/imageprofile.module.css'



export function ImageProfile({image,bigSize}) {


  var [size, setSize] = useState(s.big_image)
 
  useEffect(()=>{
     
    if(!bigSize)  setSize(s.litle_image)
    
  },[])


    
    return (
     
        <div className={s.container}>
            
            <img className={size} src={image}/> 
      
            
        </div>
    )
}