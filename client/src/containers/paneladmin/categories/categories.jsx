import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardCategory from "../../../components/admin/cardcategory/cardcategory";
import { GetAllCategories } from "../../../redux/actions";



const Categories = () => {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories)
    const status = useSelector((state) => state.status)



    useEffect(()=>{
        dispatch(GetAllCategories())
    },[])

    console.log(categories)
    return(
        <div>

            {categories?.map(card => (
                <CardCategory
                category = {card.title}
                />
            ))}

        </div>
    )
}


export default Categories