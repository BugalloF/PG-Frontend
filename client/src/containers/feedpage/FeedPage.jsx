import React from "react";
import Card from "../../components/cards/card";
import { useDispatch, useSelector } from "react-redux";
import s from "./feedpage.module.css";
import {
  GetAllPosts,
  GetAllCategories,
  setPage,
  priceOrder,
  CleanPosts,
  antOrder,
  likesOrder,
  resetPage,
  Filter,
  Countries,
  CountryFilter
} from "../../redux/actions";
import Categories from "../../components/categories/categories";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NotFound from "../../components/notFound/NotFound"


const PrincipalPage = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts);
  const allCategories = useSelector((state) => state.categories);
  const length = useSelector((state) => state.length);
  const [hasMore, setHasMore] = useState(true);
  const page = useSelector((state) => state.page);
  const name = useLocation();
  
  const countries = useSelector((state) => state.countries);

  const filterState = useSelector((state) => state.filter);
  // const [filterStateLocal, setFilterStateLocal] = useState(false);

  const [filterName, setFilterName] = useState('');

  const [order, setOrder] = useState('');
  const [refresh, setRefresh] = useState('');
  const foundOrNot = useSelector((state) => state.loader);

  useEffect(() => {
    return () => {
      setHasMore(true);
      dispatch(resetPage());
      dispatch(CleanPosts());
    };
  }, [dispatch]);
  


  useEffect(() => {
 

    dispatch(Countries());
    // console.log(filterStateLocal)
    // console.log('filtro global'+ filterState)

    if(filterState){

      if (filterName == 'price') {
        dispatch(priceOrder(order, page));
      }

      if (filterName == 'antiguedad') {
        dispatch(antOrder(order, page)); 
      }
      if (filterName == 'likes') {
        dispatch(likesOrder(order, page)); 
      }
      if (filterName == 'country') {
        dispatch(CountryFilter(order, page)); 
      }
    
    }

    if (!filterState) {
      dispatch(GetAllPosts(page, name.search));
    }

    
      dispatch(GetAllCategories());
      if (page !== 0) {
        if (page === Math.floor(length / 12)) setHasMore(false);          
      }



  }, [dispatch, page, name.search, length, order, refresh, foundOrNot,filterState]);




  let orderByPrice=(e) =>{
    e.preventDefault();
    dispatch(Filter())
    setFilterName('price')
    setOrder(e.target.value)
    setRefresh('pricee')
     
  }



  function orderByAnt(e) {
    e.preventDefault();
    dispatch(Filter())
    setFilterName('antiguedad')
    setOrder(e.target.value)
    setRefresh('ant') 
       
  }

  function orderByLikes(e) {
    e.preventDefault();
    dispatch(Filter())
    setFilterName('likes')
    setOrder(e.target.value)  
    setRefresh('like')
    
  }

  function orderByCountry(e) {
    e.preventDefault();
    dispatch(Filter())
    setFilterName('country')
    setOrder(e.target.value)  
    setRefresh('countries')
    
  }

  return (
    <div>
      <select onChange={(e) => orderByPrice(e)}>
        <option selected disabled>
          ORDENAR POR PRECIO
        </option>
        <option value="DESC">Mayor a menor</option>
        <option value="ASC">Menor a mayor</option>
      </select>


      <select onChange={(e) => orderByAnt(e)}>
        <option selected disabled>
          ORDENAR POR ANTIGUEDAD
        </option>
        <option value="DESC" >Más recientes</option>
        <option value="ASC">Más antiguos</option>
      </select>

      <select onChange={(e) => orderByLikes(e)}>
        <option selected disabled>
          ORDENAR POR LIKES
        </option>
        <option value="ASC">Mejores valorados</option>
        <option value="DESC">Peores valorados</option>
      </select>

      <select onChange={(e) => orderByCountry(e)}>
        <option selected disabled>
          ORDENAR POR PAIS
        </option>

        {countries?.map(e=>{
          return (
            <option value={e}>{e}</option>
          )
        })}

      </select>

      <InfiniteScroll
        dataLength={allPosts.length}
        hasMore={hasMore}
        next={() => dispatch(setPage())}
        loader={!foundOrNot?<h4>Cargando...</h4>:null}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Wow! Parece que llegaste al fin!</b>
          </p>
        }
      >
        <div className={s.FeedPage}>
          <div className={s.CategoryZone}>
            {allCategories?.map((cat) => (
              <Categories title={cat.title} />
            ))}
          </div>
      {foundOrNot?
        <div><h2>Cargando...</h2></div>
        :allPosts.length?
          <div className={s.Cards}>
            
            {allPosts.map((card) => (
              <Card
                postId={card.id}
                img={card.imgCompress}
                userImg={card.profile?.img}
                userId={card.profileId}
                userName={card.profile?.userName}
                country={card.profile?.country}
                price={card.price}
                title={card.title}
              />
            ))
          }
          </div>:<NotFound/>
        }
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PrincipalPage;
