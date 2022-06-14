import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteCategory, UpdateCategory } from "../../../redux/actions";
import s from "../cardcategory/cardcategory.module.css"
import { faCircleXmark, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const CardCategory = ({category, categoryId}) => {
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const [input, setInput] = useState("")
    return (
        <div>
            <ul className={s.list}>
                <li><p>{category}</p></li>
                <li><div
                className={s.buttondelete} 
                onClick={() => {
                    dispatch(DeleteCategory(categoryId))
                }}><FontAwesomeIcon icon={faCircleXmark}/></div></li>
                <li><div
                className={s.buttonedit}
                onClick={()=> setIsEdit(!isEdit)}
                ><p>editar</p><FontAwesomeIcon icon={faPenSquare}/></div></li>

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
                       className={s.input}
                       value= {input}
                       onChange= {(e) => setInput(e.target.value)}
                       type="text"  />
                       <div className={s.buttonconfirm} type="submit">confirmar</div>
                      
                    </form> 
                    :(
                        <li></li>
                       
                    )
                } 
            </ul>
        </div>
    )
}


export default CardCategory