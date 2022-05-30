import React from 'react';
import s from '../navbar/navbar.module.css'
import { SearchBar } from '../searchbar/searchbar';
import { ImageProfile } from '../imageprofile/imageprofile';
import { NavLink } from 'react-router-dom';
import { resetPage } from '../../redux/actions';
import { useDispatch } from 'react-redux';


const image = "https://rochester.kidsoutandabout.com/sites/default/files/digitalartadvanced.png"

export function NavBar(){
  const dispatch = useDispatch()
    return (

        <div className={s.container}>
          <div className={s.left}>
          <ul className={s.container_links}>
               <NavLink onClick={()=>{dispatch(resetPage())}} to={'/'}><li>Inicio</li></NavLink>
               <NavLink to={'/create'}><li>Publicar</li></NavLink>
               
            </ul>
          </div>
            <div className={s.right}>
            <div className={s.container_searchbar}><SearchBar/></div>
            <div className={s.container_image}>
            <NavLink to={'/login'}>
              <ImageProfile image={image} bigSize={false}/>
            </NavLink>
            </div>
            </div>
           
        </div>
    )
}