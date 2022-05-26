import React, { useEffect, useState } from "react";
import s from '../imageprofile/imageprofile.module.css'



export function ImageProfile(props) {


  var [size, setSize] = useState(s.big_image)
 
  useEffect(()=>{
     
    if(!props.bigSize)  setSize(s.litle_image)
    
  },[])


    
    return (
     
        <div>
            
            <img className={size} src={props.image}/>
        </div>
    )
}