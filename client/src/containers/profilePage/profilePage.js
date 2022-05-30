import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedinIn, faDeviantart } from '@fortawesome/free-brands-svg-icons';
import s from './profilePage.module.css';
import { ImageProfile } from "../../components/imageprofile/imageprofile";
import { useDispatch, useSelector } from "react-redux";
import { GetProfileByID } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";



// --------------------------------------------------------
// -----------------------DATOS DE PRUEBA-------------
// --------------------------------------------------------
const imagenes = [
  'https://rockcontent.com/es/wp-content/uploads/sites/3/2017/06/thumbnail-1024x538.png',
  'https://getuikit.com/v2/docs/images/placeholder_600x400.svg',
  'https://imag.malavida.com/mvimgbig/download-fs/android-5-lollipop-18012-1.jpg',
  'https://getuikit.com/v2/docs/images/placeholder_600x400.svg',  
  'https://imag.malavida.com/mvimgbig/download-fs/android-5-lollipop-18012-1.jpg',  
  'https://rockcontent.com/es/wp-content/uploads/sites/3/2017/06/thumbnail-1024x538.png',
]

let userTest={
    nombre:'NOMBRE',
    perfil: 'https://cetram.org/wp-content/uploads/2020/08/6b854d6ba1c432a0129a84a93be32ad0.jpg',  
}

// --------------------------------------------------------
// ---------------------------------------------------------
// --------------------------------------------------------
const image ="https://rochester.kidsoutandabout.com/sites/default/files/digitalartadvanced.png"

export default function ProfilePage() {

  const dispatch = useDispatch();
  const {id} = useParams()

  useEffect(() => {
    dispatch(GetProfileByID(id))
  }, []);

  const profile = useSelector((state) => state.profile)


  return(
    <div>
      <div className={s.container_info_profile}>
        
        <div className={s.top}>
          <div className={s.profile}>
            <ImageProfile image ={profile.img} />
          </div>
          <div className={s.follows}>
            <p>seguidores</p>
            <p>seguidos</p>
          </div>
        </div>

        <p className={profile.description}>Descripción de la cuenta</p>

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
      {
        profile.artWorks?.map(e=>(
          <img src={e.img} alt="imagenes" className={s.img}/>
        ))
      }        
      </div>


    </div>
  )
}
{/* <div>
<div className={s.container_info_profile}>
  
  <div className={s.top}>
    <div className={s.profile}>
      <ImageProfile image ={image} />
    </div>
    <div className={s.follows}>
      <p>seguidores</p>
      <p>seguidos</p>
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
{
  imagenes?.map(e=>(
    <img src={e} alt="imagenes" className={s.img}/>
  ))
}        
</div>


</div> */}