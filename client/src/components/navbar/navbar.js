// Dependencies
import React from 'react';
import {NavLink} from 'react-router-dom';
// Files
import {SearchBar} from '../searchbar/searchbar';
import {ImageProfile} from '../imageprofile/imageprofile';
import s from '../navbar/navbar.module.css'
import { GetAllPosts, resetPage } from '../../redux/actions';
import { useDispatch } from 'react-redux';



function NavBar()
{
  const loggedUser = window.localStorage.getItem("userData");
  const userDataJson = JSON.parse(loggedUser);
  const id = userDataJson ? userDataJson.id : "";
  const img = userDataJson ? userDataJson.img : "";
  const dispatch = useDispatch()
  
  return (
    <div className={s.container}>
      <div className={s.left}>
        <ul className={s.container_links}>
          <NavLink onClick={() => {
            dispatch(resetPage())
            dispatch(GetAllPosts())
            window.scrollTo(0,0)
            }} to={'/'}><li>Inicio</li></NavLink>
          {
            id ? <NavLink to={'/create'}><li>Publicar</li></NavLink>
            :
            null
          }
        </ul>
      </div>
      <div className={s.right}>
        <div className={s.container_searchbar}>
          <SearchBar/>
        </div>
        <div className={s.container_image}>
          {
            id ? <NavLink to={`/profile/${id}`}> <ImageProfile image={img} bigSize={false}/> </NavLink>
            :
            <div>
            <NavLink to="/login">Iniciar sesión</NavLink>
            <NavLink to="/register">Registarse</NavLink>
            </div>
          }
        </div>
      </div>
    </div>
  );
};


export default NavBar;