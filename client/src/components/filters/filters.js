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


const Filters = () => {
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
  console.log()

  useEffect(() => {

      if(category){
        dispatch(GetCategotyPosts(page,category,order.by,order.type));
      }else {
        dispatch(GetAllPosts(page,name.search, order.by, order.type));
      }

      dispatch(CleanStatus())
      
       
  }, [page,name.search,order,category,status]);





    return (
      <div className={s.container}>
 
      <div className={s.Container_filter}>

        <div className={s.FilterZone}>
          {allCategories?.map((cat) => (
            <button 
            
            className={s.CategoryBTN} 
            value={cat.title} 
            onClick={(e) => {
          if(category !== e.target.value){
            
            dispatch(resetPage())
            dispatch(CleanPosts())  
            dispatch(SetCategoty(e.target.value))
          }}}>{cat.title}</button>
          ))}            
        </div>
 
  <div className={s.OrderZone}>
          
    <select
    onChange={(e) => {
      dispatch(CleanPosts())
      dispatch(resetPage()) 
      setOrder({by:e.target.value.split(',')[1],type:e.target.value.split(',')[0]})}} 
    className={s.OrderSelect}>
      <option selected disabled >
        ORDENARAMIENTOS
      </option>
      <option value="DESC,price">Mayor a menor</option>
      <option value="ASC,price">Menor a mayor</option>
      <option value="DESC,likes">Mejores valorados</option>
      <option value="ASC,likes">Peores valorados</option>
      <option value="DESC,createdAt" >Más recientes</option>
      <option value="ASC,createdAt">Más antiguos</option>
    </select>


            
  </div>
 

     </div>
     
      </div>      
    );
};
export default Filters;