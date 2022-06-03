import React from "react";
import s from './categories.module.css'
import { useDispatch, useSelector } from "react-redux";
import {categoryFilter } from "../../redux/actions";
import { useState, useEffect} from "react";


const Categories = (title) => {
  const dispatch = useDispatch();


    // function catFilter(e){
    //   e.preventDefault();
    //   dispatch(categoryFilter(e))
    // }
	
    return (
            <button className={s.container} /*value={title.title} onClick={() =>catFilter(title.title)}*/>{title.title}</button>
    );
};
export default Categories;