import React from "react";
import { ImageProfile } from "../imageprofile/imageprofile";
import s from './comment.module.css';

const image ="https://rochester.kidsoutandabout.com/sites/default/files/digitalartadvanced.png"

export default function Comment(props) {


  return(
    <div className={s.comment}>
    	<div className={s.user}>
  			<ImageProfile image={image} name={'elDemi'} />
    	</div>
      	<p className={s.comment_content}>{props.comment}</p>
    </div>
  )
}