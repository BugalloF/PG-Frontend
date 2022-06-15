// Dependencies
import {React, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Navigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";
// Files
import {CleanStatus, GetAllCategories} from "../../../redux/actions";
import CardCategory from "../../../components/admin/cardcategory/cardcategory";
import FormCategory from "../../../components/admin/formcategory/formcategory";
import s from "../categories/categories.module.css"

const Categories = () => {
    const dispatch = useDispatch();
    const loggedUser = window.localStorage.getItem("userData");
    const userDataJson = JSON.parse(loggedUser);
    const isAdmin = userDataJson ? userDataJson.is_Admin : false;
    const categories = useSelector((state) => state.categories);
    const status = useSelector((state) => state.status);
    
    useEffect(() => {
        dispatch(GetAllCategories());
        dispatch(CleanStatus());
    }, [status])
    
    if(isAdmin)
    {
        return(
            <div className={s.container}>
                <NavLink to={'/paneladm'}>
                    <div className={s.arrow}>
                        <FontAwesomeIcon icon={faCircleArrowLeft}/>
                    </div>
                </NavLink>
                
                <div className={s.form}></div>
                
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
                    
                    {
                        categories?.map(card => (
                            <CardCategory
                            key = {card.id}
                            category = {card.title}
                            categoryId = {card.id}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
    else
    {
        return(<Navigate to="/"/>);
    };
};


export default Categories;