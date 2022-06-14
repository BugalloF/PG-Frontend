import { React, useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import s from "../paneladmin/paneladmin.module.css"
const {REACT_APP_URL} = process.env;


const URL = REACT_APP_URL;


const PanelAdm = () => {
    const loggedUser = window.localStorage.getItem("userData");
    const userDataJson = JSON.parse(loggedUser);
    const [count,setCount] = useState({
        Publicaciones: null,
        Usuarios: null,
        Categorias: null
    })
    useEffect(async()=>{
       const  countCategories = await axios.get(`${URL}/categories/count`)
       const  countUsers = await axios.get(`${URL}/profile/count`)
       const countPosts = await axios.get(`${URL}/art/count`)
       const result = await Promise.all([countPosts,countUsers,countCategories])
       
         setCount({
            Publicaciones:result[0].data,
            Usuarios:result[1].data,
            Categorias:result[2].data
        })
    

    },[])



    if(userDataJson.is_Admin){
        return (
            <div className={s.container}>
                <div className={s.containerCount}>
                    <h3>Usuriaros</h3>
                    <p>Usuarios registrados: {count.Usuarios}</p>
                    <NavLink className={s.link}  to={'users'}>Ver mas</NavLink>
                    
                </div>
                <div className={s.containerCount}>
                    <h3>Publicaciones</h3>
                    <p>Publicaciones totales: {count.Publicaciones}</p>
                    <NavLink className={s.link} to={'posts'}>Ver mas</NavLink>
                </div>
                <div className={s.containerCount}>
                    <h3>Categorias</h3>
                    <p>Categorias totales: {count.Categorias}</p>
                    <NavLink className={s.link} to={'categories'}>Ver mas</NavLink>
                </div>
                
                
            </div>
        )
    }else{

    }

}


export default PanelAdm