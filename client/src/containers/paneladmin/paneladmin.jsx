import { React, useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
const {REACT_APP_URL} = process.env;


const URL = REACT_APP_URL;


const PanelAdm = () => {
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



    return (
        <div>
            <div>
                <h3>Usuriaros</h3>
                <p>Usuarios registrados: {count.Usuarios}</p>
                <NavLink to={'users'}>Ver mas</NavLink>
                
            </div>
            <div>
                <h3>Publicaciones</h3>
                <p>Publicaciones totales: {count.Publicaciones}</p>
                <NavLink to={'posts'}>Ver mas</NavLink>
            </div>
            <div>
                <h3>Categorias</h3>
                <p>Categorias totales: {count.Categorias}</p>
                <NavLink to={'categories'}>Ver mas</NavLink>
            </div>
            
            
        </div>
    )
}


export default PanelAdm