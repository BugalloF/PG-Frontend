import React from "react";
import Card from "../../components/cards/card";
import { useDispatch, useSelector } from "react-redux";
import s from "./feedpage.module.css";
import {GetAllPosts, GetAllCategories,  setPage, CleanPosts } from "../../redux/actions";
import Categories from '../../components/categories/categories'
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resetPage } from '../../redux/actions';







const PrincipalPage = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts);
  const allCategories = useSelector((state) => state.categories);
  const length = useSelector((state) => state.length);
  const [hasMore, setHasMore] = useState(true)
  const page = useSelector((state) => state.page)
  const name = useLocation()



 
useEffect(() => {
  
  return () => {
    setHasMore(true)
    dispatch(resetPage())
    dispatch(CleanPosts())
    
  };
}, []);


  useEffect(() =>{
    
    dispatch(GetAllPosts(page,name.search))
    dispatch(GetAllCategories())
   if(page !== 0){
    if( page ===   Math.floor(length/12)) setHasMore(false)
    }
  
  
  },[page,name.search])

  return (
    (<InfiniteScroll
    dataLength={allPosts.length}
    hasMore={hasMore}
    next={() => dispatch(setPage())}
    >
      <div className={s.FeedPage}>
        <div className={s.CategoryZone}>
          {allCategories?.map((cat) => (
            <Categories title={cat.title} />
          ))}
        </div>

        <div className={s.Cards}>
          {allPosts ? (allPosts.map((card) => (
            
            <Card
              postId={card.id}
              img={card.imgCompress}
              userImg={card.profile.img}
              userId={card.profile.id}
              userName={card.profile.userName}
            />
            
          ))):null}
        </div>
      </div>
    </InfiniteScroll>)
  );
};

export default PrincipalPage;
