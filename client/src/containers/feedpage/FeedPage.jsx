import React from "react";
import Card from "../../components/cards/card";
import { useDispatch, useSelector } from "react-redux";
import s from "./feedpage.module.css";
import {GetAllPosts, GetAllCategories,  setPage, priceOrder, CleanPosts, antOrder,likesOrder ,resetPage } from "../../redux/actions";
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
  
  
  },[dispatch,page,name.search])



    function orderByPrice(e){
      e.preventDefault();
      dispatch(priceOrder(e.target.value))
    }

    function orderByAnt(e){
      e.preventDefault();
      dispatch(antOrder(e.target.value))
    }

    function orderByLikes(e){
      e.preventDefault();
      dispatch(likesOrder(e.target.value))
    }


  return (

    <div>

      <select onChange={(e) => orderByPrice(e)}>
          <option selected disabled>ORDENAR POR PRECIO</option>
          <option value='ASC'>Mayor a menor</option>
          <option value='DESC'>Menor a mayor</option>
      </select> 

      <select onChange={(e) => orderByAnt(e)}>
          <option selected disabled>ORDENAR POR ANTIGUEDAD</option>
          <option value='ASC'>ASC</option>
          <option value='DESC'>DESC</option>
      </select> 

      <select onChange={(e) => orderByLikes(e)}>
          <option selected disabled>ORDENAR POR LIKES</option>
          <option value='ASC'>ASC</option>
          <option value='DESC'>DESC</option>
      </select> 

      <select onChange={null}>
          <option selected disabled>ORDENAR POR PAIS</option>
      </select> 


      <InfiniteScroll
      dataLength={allPosts.length}
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
            {allPosts?.map((card) => (

              <Card
                postId={card.id}
                img={card.img}
                userImg={card.profile?.img}
                userId={card.profileId}
                userName={card.profile?.name}
                country={card.profile?.country}
                price={card.price}
                title={card.title}
              />


            ))}
          </div>
        </div>
      </InfiniteScroll>

    </div>
  );
};

export default PrincipalPage;
