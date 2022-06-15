// Dependencies
import React, {useEffect, useState} from "react";
// Files
import s from "../imageprofile/imageprofile.module.css";


export function ImageProfile({image, bigSize})
{
  const [size, setSize] = useState(s.big_image);
 

  useEffect(()=>{
     
    if(!bigSize)  setSize(s.litle_image)
    
  },[])


    
    return (
     
        <div className={s.container}>
            
            <img className={size} src={image}/> 
      
            
        </div>
    )
}

