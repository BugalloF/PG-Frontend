import React, { useState } from "react";
import Card from "../../components/cards/card";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import s from "./feedpage.module.css";
import {Categories} from '../../components/categories/categories'
import { GetAllPosts, Post } from "../../redux/actions";

const PrincipalPage = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts);

  //objeto de prueba para carta
  React.useEffect(() => {
    dispatch(GetAllPosts());
  }, []);
  console.log(allPosts)

  function handleClick(e) {
    console.log('evento',e)
    e.preventDefault();
    const files = [...e.target.files];

    if (files) {
      console.log("img", e);
      dispatch(Post(files));
    }
  }

  return (
    allPosts.length?(<div className={s.FeedPage}>
      <Categories></Categories>
        <div className={s.Cards}>
            {
                allPosts.map((card) => <Card postId={card.id} img={card.img} userId={114} userName={'elDemi'}/> )
            }
             <input type="file" onChange={handleClick}/>
        </div>
    </div>):(<div>
       <h1 style={{margin: '20vw'}}>Cargando...</h1>
       <input type="file" onChange={handleClick}/>
    </div>)
  );
};
export default PrincipalPage;
