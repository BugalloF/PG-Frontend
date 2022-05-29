import React from "react";
import Card from "../../components/cards/card";
import { useDispatch, useSelector } from "react-redux";
import s from "./feedpage.module.css";
import { GetAllPosts, Post } from "../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { useEffect } from "react";

const PrincipalPage = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts);
  const search = useSelector((state) => state.search);
  const length = useSelector((state) => state.length);
  const [page, setPage]= useState(0)

  //objeto de prueba para carta
  useEffect(() => {
    dispatch(GetAllPosts());
  
  }, []);
 

  useEffect(() =>{
    
   
   dispatch(GetAllPosts(page,search,allPosts))
   

  },[page,search])
  console.log(allPosts)

  function handleClick(e) {
  
    e.preventDefault();
    const files = [...e.target.files];

    if (files) {
      console.log("img", e);
      dispatch(Post(files));
    }
  }

  return (
    <InfiniteScroll
    dataLength={length}
    hasMore={true}
    next={() => setPage((page) => page + 1)}
    loader = {<h1>loading...</h1>}
    
    >
  
    (<div className={s.FeedPage}>
     
        <div className={s.Cards}>
            {
                allPosts.map((card) => <Card postId={card.id} img={card.img} userId={114} userName={'elDemi'}/> )
            }
             <input type="file" onChange={handleClick}/>
        </div>
    </div>)

    </InfiniteScroll>
    
  );
};


export default PrincipalPage; 
