import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllPosts,
  GetAllCategories,
  SetCategoty,
  GetCategotyPosts,
  resetPage,
  CleanPosts,

  CleanStatus,

  profile,

} from "../../redux/actions";
import { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import s from "./filters.module.css";
import FiltersSkeleton from "../loaderSkeleton/Filters/FiltersSkeleton"


const Filters = ({hasorder}) => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories);
  const page = useSelector((state) => state.page);
  const name = useLocation();
  const loggedUser = window.localStorage.getItem("userData");
  const userDataJson = JSON.parse(loggedUser);

  const [order,setOrder] = useState({
    by: "",
    type: ""
  })
  const category = useSelector((state) => state.category)
  const status = useSelector((state) => state.status)

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
        dispatch(profile(loggedUser,userDataJson.id))
      }else {
        dispatch(GetAllPosts(page,name.search, order.by, order.type));
        dispatch(profile(loggedUser,userDataJson.id))
      }

      dispatch(CleanStatus())
      
       
  }, [page,name.search,order,category,status]);





    return (
      <>
      {allCategories.length?
      <div className={s.Container_filter}>

        <div className={s.FilterZone}>
          {allCategories?.map((cat) => (
            <button className={s.CategoryBTN} value={cat.title} onClick={(e) => {
          if(category !== e.target.value){
            dispatch(resetPage())
            dispatch(CleanPosts())  
            dispatch(SetCategoty(e.target.value))
          }}}>{cat.title}</button>
          ))}            
        </div>
 {
  hasorder === false?(<div className={s.OrderZone}>
          
    <select
    onChange={(e) => {
      dispatch(CleanPosts())
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
      dispatch(CleanPosts())
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
      dispatch(CleanPosts())
      dispatch(resetPage()) 
      setOrder({by:'likes',type:e.target.value})}} 
     className={s.OrderSelect}>
      <option selected disabled>
        ORDENAR POR LIKES
      </option>
      <option value="DESC">Mejores valorados</option>
      <option value="ASC">Peores valorados</option>
    </select>          
  </div>):(null)
 }

      </div>
      :<FiltersSkeleton/>}
      </>      
    );
};
export default Filters;