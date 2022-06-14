import {React, useState} from "react";
import { useDispatch } from "react-redux";
import { AddCategory } from "../../../redux/actions";
import s from "../formcategory/formcategory.module.css"

const FormCategory = () => {
    const [input, setInput] = useState("");
    const dispatch = useDispatch()
    return(
        <div>
            <form
            onSubmit={(e) =>{
            e.preventDefault()
            dispatch(AddCategory(input))
            }}
            >

                <input className={s.input} value={input} onChange={(e) => setInput(e.target.value)} type="text" />
                <button className={s.button} type="submit">Agregar Categoria</button>
            </form>

        </div>
    )
}


export default FormCategory