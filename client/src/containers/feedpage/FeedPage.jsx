import React from "react";
import Card from "../../components/cards/card";
import { useDispatch, useSelector } from "react-redux";
import s from "./feedpage.module.css";
import { GetAllPosts, Post } from "../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

const PrincipalPage = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts);
  const length = useSelector((state) => state.length);
  const [page, setPage]= useState(0)

  //objeto de prueba para carta
  React.useEffect(() => {
    dispatch(GetAllPosts());
    console.log('asd')
  }, []);
  console.log(allPosts)

  React.useEffect(() =>{
    console.log(page)

    dispatch(GetAllPosts(page))
    console.log(allPosts)

  },[page])

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
    <InfiniteScroll
    dataLength={length}
    hasMore={true}
    next={() => setPage((page) => page + 1)}
    loader = {<h1>loading...</h1>}
    
    >
  
    (<div className={s.FeedPage}>
      {console.log(allPosts)}
        <div className={s.Cards}>
            {
                allPosts.map((card) => <Card postId={card.id} img={card.img} userId={114} userName={'elDemi'}/> )
            }
             <input type="file" onChange={handleClick}/>
        </div>
    </div>): <h1>Loading...</h1>

    </InfiniteScroll>
    
  );
};


export default PrincipalPage; 
