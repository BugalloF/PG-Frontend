// Dependencies
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import Filters from "../../components/filters/filters";
// Files
import {SearchBar} from "../searchbar/searchbar";
import {ImageProfile} from "../imageprofile/imageprofile";
import s from "../navbar/navbar.module.css";
import {CleanPosts, resetPage, SetCategoty} from "../../redux/actions";
import Usermenu from "../usermenu/usermenu";


function NavBar() {

  const urls = ['http://localhost:3000/feed','https://pg-frontend-eight.vercel.app/feed']
  const [Menu, setMenu] = useState(true);
  const loggedUser = window.localStorage.getItem("userData");
  const userDataJson = JSON.parse(loggedUser);
  const id = userDataJson ? userDataJson.id : "";
  const img = userDataJson ? userDataJson.img : "";
  const dispatch = useDispatch();
  const url = useLocation();
  
  
  function handleMenu(e)
  {
    e.preventDefault();
    setMenu(!Menu);
  };
  
  function handleQuitMenu(e)
  {
    e.preventDefault();
    setMenu(!Menu);
  };
  
  return (
    <div className={s.General}>
      <div className={s.container}>
  
    
        {
          Menu === false ? <Usermenu userID={id}></Usermenu>
          :
          null
        }
        <div className={s.left}>
          <div className={s.container_links}>
            <div className={s.container_buttons}>
            <NavLink to="/feed"
              className={s.Buttons}
              onClick={() => {
                dispatch(resetPage());
                dispatch(CleanPosts());
                dispatch(SetCategoty(null));
                window.scrollTo(0, 0);
              }}>Inicio</NavLink>
            </div>
            {
              id ? <div className={s.container_buttons}> <a href="/myfeed" className={s.Buttons}>Mi feed</a> </div>
              :
              null
            }
          </div>
        </div>
        <div className={s.right}>
<<<<<<< HEAD
        <div className={s.searchBar}>
        {
            urls.includes(window.location.href) ?
            <div className={s.Filtros}>
              <SearchBar />
            </div>
            :
            null
          }
               </div>
=======
      {url.pathname !== "/"?   <div className={s.searchBar}>
             <SearchBar />
               </div>: null} 
>>>>>>> 9d0ae5f248daa383e145763b70bbb97ed74f7979

          <div className={s.container_image}>

            {
              id ? <a onMouseOver={handleMenu} >{<ImageProfile image={img} bigSize={false} />}</a>
              :
              <div className={s.login}>
                <NavLink className={s.login} to="/login">Login</NavLink> || 
                <NavLink className={s.login} to="/register">Registrarse</NavLink>
              </div>
            }
          </div>
          
        </div>
        <div></div>
      </div>
        <div className={s.LowBar}>

          <NavLink to="/">
            {<img src='https://firebasestorage.googleapis.com/v0/b/artpage-aa77e.appspot.com/o/aa%2FLogo222.png?alt=media&token=8fa86748-ede3-4a0f-8bf1-e72cd455b1f4' alt="DigitalizArte"></img>}
          </NavLink>

           {
            urls.includes(window.location.href) ?
            <div className={s.Filtros}>
              <Filters hasorder={false}/>
            </div>
            :
            null
          }

        </div>
    </div>
  );
};


export default NavBar;