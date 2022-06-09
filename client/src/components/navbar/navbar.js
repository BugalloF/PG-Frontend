// Dependencies
import React from 'react';
import {NavLink} from 'react-router-dom';
// Files
import {SearchBar} from '../searchbar/searchbar';
import {ImageProfile} from '../imageprofile/imageprofile';
import s from '../navbar/navbar.module.css'


function NavBar()
{
  const loggedUser = window.localStorage.getItem("userData");
  const userDataJson = JSON.parse(loggedUser);
  const id = userDataJson ? userDataJson.id : "";
  const img = userDataJson ? userDataJson.img : "";
  
  return (
    <div className={s.container}>
      <div className={s.left}>
        <ul className={s.container_links}>
          <NavLink  to={'/'}><li>Inicio</li></NavLink>
          {
            id ? <div>
              
              <NavLink to={'/create'}><li>Publicar</li></NavLink>
             <NavLink to={'/feed'}><li>Mi feed</li></NavLink>
              </div>

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