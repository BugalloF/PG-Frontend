import React from 'react';
import s from '../postform/postform.module.css'
import { useState } from 'react';


export function PostForm(props) {

    //  modify = false : crear post  | modify = true : update o delete post
    const [modify, SetModify] = useState(false);


    return (
        <div className={s.container}>
       <form className={s.form}>

           {/* se renderiza un input para cargar la imagen si modify esta en false, si no se llama a la imagen de el post */}
            {!modify ? <div className={s.container_img}>
                <input className={s.input_img} type='file'/>
            </div>: <img src={props.image}/>}
            <div className={s.container_info}>
                <h6 className={s.title}>Title</h6>
                <input  className={s.input} type='text'/>
                <h6 className={s.title}>Content</h6>
                <textarea className={`${s.input} ${s.input_content}`} cols="30" rows="10" type='text'/>
                <h6 className={s.title}>Category</h6>
                <input  className={s.input} type='text'/>
                <h6 className={s.title}>Price</h6>
                <input className={s.input}  type='text'/>
                <button className={s.button} type='submit'>Create</button>
                {/* se renderiza boton de delet si modify = true */}
                {modify ? <button className={s.button} type='submit'>Delete</button>: null}
            </div>
       </form>
            
        </div>
    )
}