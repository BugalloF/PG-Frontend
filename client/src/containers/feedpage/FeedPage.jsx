import React from "react";
import Card from "../../components/cards/card";
import { useDispatch, useSelector } from "react-redux";
import s from "./feedpage.module.css";
import { ClearPosts, GetAllPosts, Post, resetPage, setPage } from "../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const PrincipalPage = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts);
  const length = useSelector((state) => state.length);
  const [hasMore, setHasMore] = useState(true)
  const page = useSelector((state) => state.page)
  const name = useLocation()
 



  useEffect(() =>{
     
    dispatch(GetAllPosts(page,name.search))
   if(page !== 0){
    if( page ===   Math.floor(length/12)) setHasMore(false)
    }
    return () => setHasMore(true)
  

  },[page,name])
      

  
  // function handleClick(e) {
  
  //   e.preventDefault();
  //   const files = [...e.target.files];

  //   if (files) {
     
  //     dispatch(Post(files));
  //   }
  // }


  return (
    <InfiniteScroll
    
    dataLength={allPosts.length}
    hasMore={hasMore}
    next={() => dispatch(setPage())}
    loader={<h4>Loading...</h4>}
    endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>}
    
    
    >
  {console.log(allPosts)}
    <div className={s.FeedPage}>
    
     
        <div className={s.Cards}>
            {
                allPosts.map((card) => <Card postId={card.id} img={card.img} userId={114} userName={'elDemi'}/> )
            }
          
        </div>
    </div>

    </InfiniteScroll>

    
  
    
  );
};


export default PrincipalPage; 
