import React from "react";
import { ImageProfile } from "../imageprofile/imageprofile";
import s from '../post/post.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
const image = "https://rochester.kidsoutandabout.com/sites/default/files/digitalartadvanced.png"

export function Post(props) {
    return (
        <div className={s.container}>
            <div className={s.container_imgpost}>
                <img className={s.img_post}/>
        </div>
            
                
                    <div className={s.container_profile}>
                     <div className={s.profile}>
                      <div className={s.imageprofile}> 
                          <ImageProfile image={image}/> 
                      </div>
                       <h4 className={s.name}>{props.name}asdasd</h4>
                       <button className={s.button_follow}>follow</button>
                     </div>
                    <div>
                        {props.description}
                    </div>
                    </div>

                    <div className={s.container_buttons}>
                        <button className={s.button_cart}>add to cart</button>
                        <button className={s.button_fav}><FontAwesomeIcon icon={faHeart}/></button>
                        <div className={s.fav}>
                            {props.fav}4<FontAwesomeIcon icon={faHeart}/>
                        </div>
                    </div>
                

        </div>
    )
}