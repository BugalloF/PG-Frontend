import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryFilter, 
  GetAllPosts,
  GetAllCategories,
  setPage,
  priceOrder,
  CleanPosts,
  antOrder,
  likesOrder,
  resetPage,
  Filter,
  PageNumber,
  FilterNo  
} from "../../redux/actions";
import { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import s from "./filters.module.css";


const Filters = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts);
  const allCategories = useSelector((state) => state.categories);
  const length = useSelector((state) => state.length);
  const page = useSelector((state) => state.page);
  const name = useLocation();

  const pageNumber = useSelector((state) => state.pageNumber);
  const hasMore = useSelector((state) => state.hasMore);


  const filterState = useSelector((state) => state.filter);
  const [filterName, setFilterName] = useState('');

  const [order, setOrder] = useState('');
  const [refresh, setRefresh] = useState('');
  const foundOrNot = useSelector((state) => state.loader);


  useEffect(() => {
 
    if(filterState){
      dispatch(PageNumber())

      if (filterName == 'price') {
        dispatch(priceOrder(order, page));
      }

      if (filterName == 'antiguedad') {
        dispatch(antOrder(order, page)); 
      }
      if (filterName == 'likes') {
        dispatch(likesOrder(order, page)); 
      }
      if (filterName == 'category') {
        dispatch(categoryFilter(order, page)); 
      }    
    }

    if (!filterState) {
      dispatch(PageNumber())
      dispatch(GetAllPosts(page, name.search));
    }

    
      dispatch(GetAllCategories());
      

  }, [dispatch, page, name.search, length, order, refresh, foundOrNot,filterState]);




  let orderByPrice=(e) =>{
    e.preventDefault();
    dispatch(resetPage())
    dispatch(Filter())
    setFilterName('price')
    setOrder(e.target.value)
    setRefresh('pricee')
  }



  function orderByAnt(e) {
    e.preventDefault();
    dispatch(resetPage())
    dispatch(Filter())
    setFilterName('antiguedad')
    setOrder(e.target.value)
    setRefresh('ant') 
  }

  function orderByLikes(e) {
    e.preventDefault();
    dispatch(resetPage())
    dispatch(Filter())
    setFilterName('likes')
    setOrder(e.target.value)  
    setRefresh('like')
  }


  function catFilter(e){
    e.preventDefault();
    dispatch(resetPage())
    dispatch(Filter())
    setFilterName('category')
    setOrder(e.target.value)  
    setRefresh('categoryy')
  }
  

    return (
      <div className={s.Container_filter}>

        <div >
          {allCategories?.map((cat) => (
            <button className={s.CategoryZone} value={cat.title} onClick={(e) =>catFilter(e)}>{cat.title}</button>
          ))}            
        </div>
 
        <div className={s.OrderZone}>
          
          <select className={s.OrderSelect} onChange={(e) => orderByPrice(e)}>
            <option selected disabled >
              ORDENAR POR PRECIO
            </option>
            <option value="DESC">Mayor a menor</option>
            <option value="ASC">Menor a mayor</option>
          </select>


          <select className={s.OrderSelect} onChange={(e) => orderByAnt(e)}>
            <option selected disabled>
              ORDENAR POR ANTIGUEDAD
            </option>
            <option value="DESC" >Más recientes</option>
            <option value="ASC">Más antiguos</option>
          </select>

          <select className={s.OrderSelect} onChange={(e) => orderByLikes(e)}>
            <option selected disabled>
              ORDENAR POR LIKES
            </option>
            <option value="ASC">Mejores valorados</option>
            <option value="DESC">Peores valorados</option>
          </select>          
        </div>


      </div>
      
    );
};
export default Filters;