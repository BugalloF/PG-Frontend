import React from "react";
import {Detail} from "../../components/detail/detail";
import Card from "../../components/cards/card";
import s from './detailPage.module.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CleanDetail, CleanReco, GetDetail, GetRecoPosts } from "../../redux/actions";
import { useParams } from "react-router-dom";

// --------------------------------------------------------
// -----------------------DATOS DE PRUEBA-------------
// --------------------------------------------------------




export default function DetailPage() {

  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail)
  const {idPost} = useParams();
  const idPosteo = detail.artWork ? detail.artWork[0].id : undefined;
  const loggedUser = window.localStorage.getItem("userData");
  const recommended = useSelector((state) => state.recommended)
  const category  = detail.artWork ? detail.artWork[0].categories[0].title : null
  
  useEffect(() => {

    dispatch(GetDetail(loggedUser, idPost))
   
    

    return () => {
      dispatch(CleanDetail())
      dispatch(CleanReco())
    };
  },[dispatch]);

  useEffect(() =>{
   if(category !== null)  dispatch(GetRecoPosts(0,category))
  },[detail])



  

  return(
    idPosteo?( <div className={s.container_detailPage}>
       <Detail image={detail.artWork[0].imgCompress} description={detail.artWork[0].content} user={detail.artWork[0].profile.userName}  profile={detail.artWork[0].profile} price={detail.artWork[0].price} title={detail.artWork[0].title} idPost={idPost} likes ={detail.likesCounter} isLiked={detail.isLiked} isLogged={loggedUser} profileId={detail.artWork[0].profileId}/>
         
       <div className={s.container_recommendation}>
         <h2>publicaciones recomendadas</h2>
           <div className={s.cardsRec}>
               {
                recommended?.map((card) => (
               card.id !== idPosteo ?   <Card
                postId={card.id}
                img={card.imgCompress}
                userImg={card.profile?.img}
                userId={card.profile?.id}
                userName={card.profile?.userName}
                country={card.profile?.country}
                price={card.price}
                title={card.title}
              /> : null
                 )) 
               } 
           </div>
               
       </div>

     </div>):(<div><h1>cargando...</h1></div>)
 );
};