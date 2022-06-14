// Dependencies
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'

import Filters from "../../components/filters/filters"

import {FiLogIn} from "react-icons/fi"

// Files
import { SearchBar } from "../searchbar/searchbar";
import { ImageProfile } from "../imageprofile/imageprofile";
import s from "../navbar/navbar.module.css";
import {
  CleanPosts,
  GetAllPosts,
  resetPage,
  SetCategoty,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Usermenu from "../usermenu/usermenu";

function NavBar() {
  const allCategories = useSelector((state) => state.categories);
  const loader = useSelector((state) => state.loader);
  const urls = ['http://localhost:3000/feed']
  const [Menu, setMenu] = useState(true);
  const loggedUser = window.localStorage.getItem("userData");
  const userDataJson = JSON.parse(loggedUser);
  const id = userDataJson ? userDataJson.id : "";
  const img = userDataJson ? userDataJson.img : "";
  const dispatch = useDispatch();
  function handleMenu(e) {
    console.log("a");
    e.preventDefault();
    setMenu(!Menu);
  }

  return (
    <div className={s.General}>
      <div className={s.container}>
        {Menu === false ? <Usermenu userID={id}></Usermenu> : null}
        <div className={s.left}>
          <ul className={s.container_links}>
            <NavLink to="/feed"
              // href="/feed"
              className={s.Buttons}
              onClick={() => {
                dispatch(resetPage());
                dispatch(CleanPosts);
                dispatch(SetCategoty(null));

                window.scrollTo(0, 0);
              }}>Inicio</NavLink>
            {id ? (
              <a href="/myfeed" className={s.Buttons}>
                Mi feed
              </a>
            ) : null}
          </ul>
        </div>
        <div className={s.right}>
          <div className={s.container_image}>
            {id ? (
              <a onClick={handleMenu}>
                {allCategories.length || !loader?<ImageProfile image={img} bigSize={false} />:<Skeleton className={s.profile_skeleton} circle width={38} heigth={38}/>}
              </a>
            ) : (
              <div>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Registarse</NavLink>
              </div>
            )}
          </div>
        </div>
        <div></div>
      </div>
        <div className={s.LowBar}>
          <NavLink to="/">
            {allCategories.length || !loader?<img src={require(`../../img/Logo222.png`)} alt="DigitalizArte"></img>:<Skeleton className={s.Logo_skeleton} baseColor = "#d0a9d0" width={280} heigth={200}/>}
          </NavLink>
          {urls.includes(window.location.href)?(
            <div className={s.Filtros}>
              <Filters hasorder={false}/>
            </div>
          ):null}
          {
            urls.includes(window.location.href)?(
              <SearchBar />
            ):null        
          }
        </div>  
    </div>
  );
}

export default NavBar;
