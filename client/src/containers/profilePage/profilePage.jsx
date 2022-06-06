// Dependencies
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
// import {useParams} from "react-router-dom";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faLinkedinIn, faDeviantart} from '@fortawesome/free-brands-svg-icons';
// Files
import s from './profilePage.module.css';
import {ImageProfile} from "../../components/imageprofile/imageprofile";
import {CleanProfile, GetProfileDetail, profile} from "../../redux/actions/index";
import Card from "../../components/cards/card";

function ProfilePage()
{
  const dispatch = useDispatch();
  const  user  = useSelector(state => state.profile);
  const loggedUser = window.localStorage.getItem("userData");
  const userDataJson = JSON.parse(loggedUser);
  const id = userDataJson ? userDataJson.id : "";
  
  const {profileId} = useParams()
  
  const navigate = useNavigate();
  
  useEffect(() => {
      dispatch(GetProfileDetail(profileId));
      return () =>{
        dispatch(CleanProfile())
      };
  }, []);

console.log('holis',user)
  function handleLogout(e)
  {
      e.preventDefault();
      window.localStorage.clear();
      navigate("/");
  };
  
  if(user && loggedUser)
  {
    return(
      <div>
        <div className={s.container_info_profile}>
          <div className={s.top}>
            <div className={s.profile}>
              <ImageProfile image ={user.img} name={user.userName} />
            </div>
            <div className={s.follows}>
              <p>Seguidores</p>
              <p>Seguidos</p>
            </div>
          </div>
          
          <p className={s.description}>Descripción de la cuenta</p>
          
          <div className={s.social_media}>
            <a href="/#" target="_blank"><FontAwesomeIcon className={s.facebook} icon={faFacebook} /></a>
            <a href="/#" target="_blank">
              <svg aria-hidden="true" className="native svg-icon iconGoogle" width="45" height="45" viewBox="0 0 18 18"><path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z" fill="#4285F4"></path><path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z" fill="#34A853"></path><path d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z" fill="#FBBC05"></path><path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z" fill="#EA4335"></path></svg>           
            </a>
            <a href="/#" target="_blank"><FontAwesomeIcon className={s.devianArt} icon={faDeviantart} /></a>
            <a href="/#" target="_blank"><FontAwesomeIcon className={s.linkedin} icon={faLinkedinIn} /></a>
          </div>
        </div>
        
        <div className={s.container_image}>
        {user.artworks?.map((card) => (
              <Card
                key = {card.id}
                img={card.imgCompress}
                userImg={user.img}
                postId ={card.id}
             
                price={card.price}
                title={card.title}
              />
            ))
          }
           
        
        </div>

        { userDataJson.id === profileId ?
      <button onClick={handleLogout}>Logout</button>: null
        }
        
       
      </div>
    );
  }
  else
  {
      return(<Navigate to="/login"/>);
  };
};


export default ProfilePage;