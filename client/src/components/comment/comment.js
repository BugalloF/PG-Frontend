import React from "react";
import Profile from "../profile/profile"
import s from './comment.module.css';


export default function Comment(props) {


  return(
    <div className={s.comment}>
    	<div className={s.user}>
  			<Profile userName={props.name} photo={props.photo} follow={false} />
    	</div>
      	<p className={s.comment_content}>{props.comment}</p>
    </div>
  )
}