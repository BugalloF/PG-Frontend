import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardCategory from "../../../components/admin/cardcategory/cardcategory";
import FormCategory from "../../../components/admin/formcategory/formcategory";
import { CleanStatus, GetAllCategories } from "../../../redux/actions";



const Categories = () => {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories)
    const status = useSelector((state) => state.status)



    useEffect(()=>{
        dispatch(GetAllCategories())
        dispatch(CleanStatus())
    },[status])



   
    return(
        <div>
            <FormCategory/>

            {categories?.map(card => (
                <CardCategory
                key = {card.id}
                category = {card.title}
                categoryId = {card.id}
                />
            ))}

        </div>
    )
}


export default Categories