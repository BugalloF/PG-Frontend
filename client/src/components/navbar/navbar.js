// Dependencies
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import Usermenu from "../usermenu/usermenu";


function NavBar() {
  const urls = ['http://localhost:3000/feed', 'http://localhost:3000/myfeed', 'http://localhost:3000/']
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
            <a
              href="/feed"
              className={s.Buttons}
              onClick={() => {
                dispatch(resetPage());
                dispatch(CleanPosts);
                dispatch(SetCategoty(null));
                dispatch(GetAllPosts());
                window.scrollTo(0, 0);
              }}>Inicio</a>
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
                <ImageProfile image={img} bigSize={false} />
              </a>
            ) : (
              <div>
                <NavLink to="/login">Iniciar sesión</NavLink>
                <NavLink to="/register">Registarse</NavLink>
              </div>
            )}
          </div>
        </div>
        <div></div>
      </div>
      {
        urls.includes(window.location.href)?(<div className={s.LowBar}>
          <img src={require(`../../img/Logo222.png`)} alt="DigitalizArte"></img>
          <SearchBar />
        </div>):(null)
      }  
    </div>
  );
}

export default NavBar;
