import React, { useEffect, useState } from "react";
import s from '../carrucel/carrucel.module.css'




export function Carrucel(props) {
   
    var [currentImage, setCurrentImage] = useState(props.image[0]);
    var [index, setIndex] = useState(0);

    const HandlerNext = () => { 
        if(index < props.image.length-1 ){
            setIndex(index + 1)
            (props.image[index])
            
        }else setIndex(0)
    }

    const HandlerPrev = () => {
        if(index !== 0 ){
            setIndex(index - 1)
        }else setIndex(props.image.length-1)
    }

    useEffect(() =>{
        setCurrentImage(props.image[index])
       
    },[index])

    useEffect(() =>{
        const interval  = setInterval(() => {
            HandlerNext()
            
        }, 4000);
        return () => clearInterval(interval)
    })
  


    return(
        <div className={s.container}>

            <div className={s.container_img}>
                <img className={s.img} src={currentImage} alt='img'/>
                
                    {/* <button className={s.button} onClick={() => HandlerPrev()}>Prev</button>
                    <button onClick={() => HandlerNext()}>Next</button> */}
                
            </div>
            
    

        </div>
    )
}