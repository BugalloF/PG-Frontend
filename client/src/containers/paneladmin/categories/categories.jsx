import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardCategory from "../../../components/admin/cardcategory/cardcategory";
import FormCategory from "../../../components/admin/formcategory/formcategory";
import { CleanStatus, GetAllCategories } from "../../../redux/actions";
import s from "../categories/categories.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Categories = () => {
    const loggedUser = window.localStorage.getItem("userData");
    const userDataJson = JSON.parse(loggedUser);
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories)
    const status = useSelector((state) => state.status)



    useEffect(()=>{
        dispatch(GetAllCategories())
        dispatch(CleanStatus())
    },[status])




    if(userDataJson.is_Admin){
        return(
            <div className={s.container}>

<NavLink to={'/paneladm'}><div className={s.arrow}><FontAwesomeIcon icon={faCircleArrowLeft}/></div></NavLink>

 
            <div className={s.form}>
          
            </div>


             
             <div className={s.cards}>
             <div>
               <ul className={s.list}>
                 <li>Nombre</li>
                 <li>Borrar</li>
                 <li></li>
                 <li>Editar</li>

           
            
               </ul>
             </div>
             <FormCategory/>
    
             {categories?.map(card => (
                    <CardCategory
                    key = {card.id}
                    category = {card.title}
                    categoryId = {card.id}
                    />
                ))}
             </div>
    
            </div>
        )
    }else{

    }
}


export default Categories