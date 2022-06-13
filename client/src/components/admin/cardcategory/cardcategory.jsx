import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteCategory, UpdateCategory } from "../../../redux/actions";
import s from "../cardcategory/cardcategory.module.css"



const CardCategory = ({category, categoryId}) => {
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const [input, setInput] = useState("")
    return (
        <div>
            <ul className={s.list}>
                <li>{category}</li>
                <li><button 
                onClick={() => {
                    dispatch(DeleteCategory(categoryId))
                }}>x</button></li>
                <li><button
                onClick={()=> setIsEdit(true)}
                >editar</button></li>

                {
                    isEdit ? 
                    <form
                    onSubmit={(e) =>{
                        e.preventDefault(e)
                        dispatch(UpdateCategory(categoryId,input))
                        setIsEdit(false)
                    }}
                    >
                       
                       <input
                       value= {input}
                       onChange= {(e) => setInput(e.target.value)}
                       type="text"  />
                       <button type="submit">confirmar</button>
                      
                    </form> 
                    :
                    null
                } 
            </ul>
        </div>
    )
}


export default CardCategory