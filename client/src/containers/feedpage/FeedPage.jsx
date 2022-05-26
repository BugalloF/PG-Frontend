import React, { useState } from "react";
import Card from "../../components/cards/card";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import s from "./feedpage.module.css";
import { GetAllPosts, Post } from "../../redux/actions";

const PrincipalPage = () => {
  const dispatch = useDispatch();
  const compressed = useSelector((state) => state.compressedPost);
  const allPosts = useSelector((state) => state.posts);

  //objeto de prueba para carta
  React.useEffect(() => {
    dispatch(GetAllPosts());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    const files = [...e.target.files];

    if (files) {
      console.log("img", e);
      dispatch(Post(files));
    }
  }

  return (
    allPosts.length?(<div className={s.FeedPage}>
        <div className={s.Cards}>
            {
                allPosts.map((card) => <Card postId={card.id} img={card.imgCompress} userId={114} userName={'elDemi'}/> )
            }
        </div>
    </div>):(<div>
       <h1 style={{margin: '20vw'}}>Cargando...</h1>
    </div>)
  );
};
export default PrincipalPage;
