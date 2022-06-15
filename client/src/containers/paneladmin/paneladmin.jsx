// Dependencies
import React, {useEffect, useState} from "react";
import {NavLink, Navigate} from "react-router-dom";
import axios from "axios";
// Files
import s from "../paneladmin/paneladmin.module.css"
const {REACT_APP_URL} = process.env;


const URL = REACT_APP_URL;


const PanelAdm = () => {
    const loggedUser = window.localStorage.getItem("userData");
    const userDataJson = JSON.parse(loggedUser);
    const isAdmin = userDataJson ? userDataJson.is_Admin : false;
    const [count, setCount] = useState({
        Publicaciones: null,
        Usuarios: null,
        Categorias: null,
        Transacciones: null,
    });
    
    useEffect(async () => {
        const countCategories = await axios.get(`${URL}/categories/count`);
        const countUsers = await axios.get(`${URL}/profile/count`);
        const countPosts = await axios.get(`${URL}/art/count`);
        const countTrans = await axios.get(`${URL}/transactions/count`);
        const result = await Promise.all([countPosts, countUsers, countCategories, countTrans]);
        setCount({
            Publicaciones:result[0].data,
            Usuarios:result[1].data,
            Categorias:result[2].data,
            Transacciones: result[3].data,
        });
    }, []);
    
    if(isAdmin)
    {
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
                
                <div className={s.containerCount}>
                    <h3>Transacciones</h3>
                    <p>Transacciones totales: {count.Transacciones}</p>
                    <NavLink className={s.link} to={'transactions'}>Ver mas</NavLink>
                </div>
            </div>
        );
    }
    else
    {
        return(<Navigate to="/"/>);
    };
};


export default PanelAdm;