import React from "react";
import Card from "../../components/cards/card";
import { useDispatch, useSelector } from "react-redux";
import s from "./feedpage.module.css";
import {GetAllPosts, GetAllCategories,  setPage } from "../../redux/actions";
import Categories from '../../components/categories/categories'
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PrincipalPage = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts);
  const allCategories = useSelector((state) => state.categories);
  const length = useSelector((state) => state.length);
  const [hasMore, setHasMore] = useState(true)
  const page = useSelector((state) => state.page)
  const name = useLocation()


  console.log(allPosts)
 



  useEffect(() =>{
    
    dispatch(GetAllPosts(page,name.search))
    dispatch(GetAllCategories())
   if(page !== 0){
    if( page ===   Math.floor(length/12)) setHasMore(false)
    }
    return () => {
      setHasMore(true)
      
    }
  
  },[page,name.search])

  return (
    <InfiniteScroll
    dataLength={allPosts ? allPosts.length : 1}
    hasMore={hasMore}
    next={() => dispatch(setPage())}
    loader={<h4>Cargando...</h4>}
    endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Wow! Parece que llegaste al fin!</b>
    </p>}
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
            
          ))): null}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default PrincipalPage;
