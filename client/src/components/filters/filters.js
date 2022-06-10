import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllPosts,
  GetAllCategories,
  SetCategoty,
  GetCategotyPosts,
  resetPage,
  CleanPosts,
} from "../../redux/actions";
import { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import s from "./filters.module.css";


const Filters = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories);
  const page = useSelector((state) => state.page);
  const name = useLocation();
  const [order,setOrder] = useState({
    by: "",
    type: ""
  })
  const category = useSelector((state) => state.category)

  useEffect(()=>{
    dispatch(GetAllCategories())
    return () =>{
      dispatch(CleanPosts())
      dispatch(SetCategoty(null))
    }

  },[])


  useEffect(() => {

      if(category){
        dispatch(GetCategotyPosts(page,category,order.by,order.type));
      }else {
        dispatch(GetAllPosts(page,name.search, order.by, order.type));
      }
       
  }, [page,name.search,order,category]);





    return (
      <div className={s.Container_filter}>

        <div >
          {allCategories?.map((cat) => (
            <button className={s.CategoryZone} value={cat.title} onClick={(e) => {
            dispatch(resetPage())  
            dispatch(SetCategoty(e.target.value))
                
                  
            }} >{cat.title}</button>
          ))}            
        </div>
 
        <div className={s.OrderZone}>
          
          <select
          onChange={(e) => {
            dispatch(resetPage()) 
            setOrder({by:'price',type:e.target.value})}} 
          className={s.OrderSelect}>
            <option selected disabled >
              ORDENAR POR PRECIO
            </option>
            <option value="DESC">Mayor a menor</option>
            <option value="ASC">Menor a mayor</option>
          </select>


          <select
          onChange={(e) =>{ 
            dispatch(resetPage()) 
            setOrder({by:'createdAt',type:e.target.value})
          }}  
          className={s.OrderSelect} >
            <option selected disabled>
              ORDENAR POR ANTIGUEDAD
            </option>
            <option value="DESC" >Más recientes</option>
            <option value="ASC">Más antiguos</option>
          </select>

          <select
           onChange={(e) => {
            dispatch(resetPage()) 
            setOrder({by:'likes',type:e.target.value})}} 
           className={s.OrderSelect}>
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