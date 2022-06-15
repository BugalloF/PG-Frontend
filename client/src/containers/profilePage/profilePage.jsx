// Dependencies
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate, useParams, Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faLinkedinIn, faDeviantart, faInstagram, faLinkedin} from '@fortawesome/free-brands-svg-icons';
// Files
import s from './profilePage.module.css';
import {ImageProfile} from "../../components/imageprofile/imageprofile";
import {addFollower, CleanProfile, deleteFollower, profile} from "../../redux/actions/index";
import Card from "../../components/cards/card";
import ProfileSkeleton from "../../components/loaderSkeleton/Profile/ProfileSkeleton"

function ProfilePage()
{
  const dispatch = useDispatch();
  const user = useSelector(state => state.profile);
  const loggedUser = window.localStorage.getItem("userData");
  const userDataJson = JSON.parse(loggedUser);
  const id = userDataJson ? userDataJson.id : "";
  const userArtworks = user.found && user.found.artworks;
  const {profileId} = useParams();
  const navigate = useNavigate();
  const load = useSelector(state => state.loader);

  useEffect(() => {
    dispatch(profile(loggedUser, profileId));
    return () => {
      dispatch(CleanProfile());
    };
  }, [profileId]);
  


  function handleLogout(e)
  {
    e.preventDefault();
    window.localStorage.clear();
    navigate("/");
  };
  function handlerOnFollow(e)
  {
    e.preventDefault()
    dispatch(addFollower(loggedUser,profileId))
  }

  function handlerOnUnfollow(e)
  {
    e.preventDefault()
    dispatch(deleteFollower(loggedUser,profileId))
  }
  
  if(user && loggedUser)
  {
    // console.log(user)
    return(
      <>
      {!load?      
      <div>
        <div className={s.container_info_profile}>
          <div className={s.top}>
            <div className={s.profile}>
              <ImageProfile image={user.found && user.found.img} name={user.found} />
              <h2>{user.found && user.found.userName}</h2>
            </div>
            <div className={s.follows}>
              <p>Seguidores: {user.cantSeguidores}</p>
              <p>Seguidos: {user.cantSeguidos}</p>
              { 
                id !== profileId ? user.isFollowing === false ? 
                <button onClick={handlerOnFollow}>
                  <span>
                    Seguir
                  </span>
                </button>
                :
                <div>
                  <button onClick={handlerOnUnfollow}>
                  <span>
                    {/* poner un hover con un dejar de seguir */}
                    Siguiendo
                  </span>
                </button>
                </div>
                :
                <Link to={`/profile/editProfile/${profileId}`}>                
                  <button>
                    EDITAR PERFIL
                  </button>
                </Link>                
              }
            </div>
          </div>
          
          <p className={s.description}>{user?.found?.description}</p>
          
          <div className={s.social_media}>
            {user?.found?.facebook?(<a href={`https://www.${user.found.facebook}`} target="_blank"><FontAwesomeIcon className={s.facebook} icon={faFacebook} /></a>):null}
            {user?.found?.instagram?(<a href={`https://www.${user.found.instagram}`} target="_blank"><FontAwesomeIcon className={s.instagram} icon={faInstagram} /></a>):null}
            {user?.found?.linkedIn?(<a href={`https://www.${user.found.linkedIn}`} target="_blank"><FontAwesomeIcon className={s.linkedin} icon={faLinkedin} /></a>):null}
            {user?.found?.deviantart?(<a href={`https://www.${user.found.deviantart}`} target="_blank"><FontAwesomeIcon className={s.deviantart} icon={faDeviantart} /></a>):null}
          </div>
        </div>
        
        <div className={s.container_image}>
          {
            userArtworks?.map((card) => (
                <Card
                  key = {card.id}
                  img={card.imgCompress}
                  userImg={user.found.img}
                  postId ={card.id}
                  price={card.price}
                  title={card.title}
                />
              ))
          }
        </div>
        {
          profileId === id ? 
          <button onClick={handleLogout}>Logout</button> 
          :
          null
        }
      </div>: <ProfileSkeleton/>}
      </>
    );
  }
  else
  {
    return(<Navigate to="/login"/>);
  };
};


export default ProfilePage;