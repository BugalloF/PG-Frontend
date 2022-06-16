// Dependencies
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useParams, Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faDeviantart, faInstagram, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import { faUserPen} from "@fortawesome/free-solid-svg-icons";

// Files
import s from './profilePage.module.css';
import {ImageProfile} from "../../components/imageprofile/imageprofile";
import {addFollower, CleanProfile, deleteFollower, profile} from "../../redux/actions/index";
import Card from "../../components/cards/card";
import ProfileSkeleton from "../../components/loaderSkeleton/Profile/ProfileSkeleton"
// console.log(faSolidFaUserPen)
function ProfilePage()
{
  const dispatch = useDispatch();
  const user = useSelector(state => state.profile);
  const load = useSelector(state => state.loader);
  const loggedUser = window.localStorage.getItem("userData");
  const userDataJson = JSON.parse(loggedUser);
  const id = userDataJson ? userDataJson.id : "";
  const userArtworks = user.found && user.found.artworks;
  const {profileId} = useParams();

  useEffect(() => {
    dispatch(profile(loggedUser, profileId));
    return () => {
      dispatch(CleanProfile());
    };
  }, [profileId]);
  
  function handlerOnFollow(e)
  {
    e.preventDefault()
    dispatch(addFollower(loggedUser,profileId))
  };
  
  function handlerOnUnfollow(e)
  {
    e.preventDefault()
    dispatch(deleteFollower(loggedUser,profileId))
  };
  
  if(user && loggedUser)
  {
    return(
      <>
      {!load?
        <div>
          <div className={s.container_info_profile}>
            <div className={s.profile}>
                <img src={user.found && user.found.img}/>
                <h2>{user.found && user.found.userName}</h2>
             
            </div>

            <div>
            <p className={s.description}>{user?.found?.description}</p>
            </div>
            
          <div className={s.follows}>

          <div className={s.top}>
            <p>{user.cantSeguidores} Seguidores </p>
            <p>{user.cantSeguidos} Seguidos</p> 
              </div>
            <div>
              
              { 
                  id !== profileId ? user.isFollowing === false ? 
                  <button className={s.followbutton} onClick={handlerOnFollow}>
                    <span>
                     + Seguir
                    </span>
                  </button>
                  :
                  <div>
                    <button className={s.followbutton2} onClick={handlerOnUnfollow}>
                    <span>
                      {/* poner un hover con un dejar de seguir */}
                      Siguiendo
                    </span>
                  </button>
            </div>:
                <div>
                  <Link to={`/profile/editProfile/${profileId}`}>
                    <h2 className={s.LandingImg}>Editar perfil</h2>
                  </Link>                
                </div>
                  }
              </div>

              <div>

              </div>

            <div className={s.social_media}>
              {user?.found?.facebook?(<a href={user.found.facebook} target="_blank"><FontAwesomeIcon className={s.facebook} icon={faFacebook} /></a>):null}
              {user?.found?.instagram?(<a href={user.found.instagram} target="_blank"><FontAwesomeIcon className={s.instagram} icon={faInstagram} /></a>):null}
              {user?.found?.linkedIn?(<a href={user.found.linkedIn} target="_blank"><FontAwesomeIcon className={s.linkedin} icon={faLinkedin} /></a>):null}
              {/* {user?.found?.deviantart?(<a href={`https://www.${user.found.deviantart}`} target="_blank"><FontAwesomeIcon className={s.deviantart} icon={faDeviantart} /></a>):null} */}
            </div>
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
        </div>
        :
        <ProfileSkeleton/>
      }
      </>
    );
  }
  else
  {
    return(<Navigate to="/login"/>);
  };
};


export default ProfilePage;