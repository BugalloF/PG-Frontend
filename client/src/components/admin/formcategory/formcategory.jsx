import {React, useState} from "react";
import { useDispatch } from "react-redux";
import { AddCategory } from "../../../redux/actions";


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
                <h4>Categoria</h4>
                <input value={input} onChange={(e) => setInput(e.target.value)} type="text" />
                <button type="submit">Agregar Categoria</button>
            </form>

        </div>
    )
}


export default FormCategory