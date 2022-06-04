import React from 'react';
import s from '../navbar/navbar.module.css'
import { SearchBar } from '../searchbar/searchbar';
import { ImageProfile } from '../imageprofile/imageprofile';
import { NavLink } from 'react-router-dom';




const image = "https://rochester.kidsoutandabout.com/sites/default/files/digitalartadvanced.png"

export function NavBar(){
  const loggedUser = window.localStorage.getItem("userData");
  const userDataJson = JSON.parse(loggedUser);
  const id = userDataJson ? userDataJson.id : "";
  console.log(id);
  
    return (

        <div className={s.container}>
          <div className={s.left}>
          <ul className={s.container_links}>
               <NavLink  to={'/'}><li>Inicio</li></NavLink>
               {
                 id ? <NavLink to={'/create'}><li>Publicar</li></NavLink>
                 :
                 null
               }
               
            </ul>
          </div>
            <div className={s.right}>
            <div className={s.container_searchbar}><SearchBar/></div>
            <div className={s.container_image}>
              {
                id ? <NavLink to={`/profile/${id}`}>
                <ImageProfile image={image} bigSize={false}/>
              </NavLink>
              :
              <div>
              <NavLink to={`/login`}>
              Login
            </NavLink>
              <NavLink to={`/register`}>
              Register
            </NavLink>
              </div>
              }
            
            </div>
            </div>
           
        </div>
    )
}