// Dependencies
import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
// Files
import {SearchBar} from '../searchbar/searchbar';
import {ImageProfile} from '../imageprofile/imageprofile';
import s from '../navbar/navbar.module.css'
import { CleanPosts, GetAllPosts, resetPage, SetCategoty } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import Usermenu from '../usermenu/usermenu';

function NavBar()
{
  const [Menu, setMenu] = useState(true)
  const loggedUser = window.localStorage.getItem("userData");
  const userDataJson = JSON.parse(loggedUser);
  const id = userDataJson ? userDataJson.id : "";
  const img = userDataJson ? userDataJson.img : "";
  const dispatch = useDispatch()
  function handleMenu(e){
    console.log('a')
    e.preventDefault()
    setMenu(!Menu)
  }

  return (
    <div className={s.container}>
      {
        Menu === false?(<Usermenu userID={id}></Usermenu>):(null)
      }
      <div className={s.left}>
        <ul className={s.container_links}>
          <NavLink onClick={() => {
            dispatch(resetPage())
            dispatch(CleanPosts)
            dispatch(SetCategoty(null))
            dispatch(GetAllPosts())
            window.scrollTo(0,0)
            }} to={'/'}><li>Inicio</li></NavLink>
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
            id ? <a onClick={handleMenu}><ImageProfile image={img} bigSize={false}/></a> 
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