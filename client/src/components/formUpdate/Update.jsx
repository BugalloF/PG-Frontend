// Dependencies
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate,useParams} from "react-router-dom";
import swal from "sweetalert";
// Files
import {CleanStatus, EditArtwork, GetAllCategories, GetDetail} from "../../redux/actions";
import s from "./Update.module.css";

function Update()
{
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    const detail = useSelector((state) => state.detail)
    const status = useSelector(state => state.status);
    const {idPost} = useParams();
    const loggedUser = window.localStorage.getItem("userData");
    const userDataJson = JSON.parse(loggedUser);
    const id = userDataJson ? userDataJson.id : "";
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        id: "",
        title: "",
        content: "",
        price: "",
        category: "",
        input: [],
    });
    
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(GetAllCategories());
        dispatch(GetDetail(loggedUser, idPost));
    }, []);
    
    useEffect(()=>{
        if(detail.artWork)
        {
            setInput({
                id: idPost,
                title: detail.artWork[0].title,
                content: detail.artWork[0].content,
                price: detail.artWork[0].price,
                category: "",
                input: [],
            });
        };
    }, [detail])
    
    useEffect(() => {
        if(status === 201)
        {
            setInput({
                id: idPost,
                title: "",
                content: "",
                price: "",
                category: "",
                input: [],
            });
            swal("La obra fue modificada correctamente!");
            navigate(`/post/${idPost}`);
        };
        dispatch(CleanStatus());
    }, [status]);
    
    function validate(input)
    {
        const errors = {};
        
        if(!input.title)
        {
            errors.title = <font></font>;
        }
        else if(input.title.length > 20)
        {
            errors.title = <font></font>;
        }
        else if(!input.content)
        {
            errors.content = <font></font>;
        }
        else if(input.content.length > 140)
        {
            errors.content = <font></font>;
        }
        else if(!input.category)
        {
            errors.category = <font></font>;
        }
        else if(!input.price)
        {
            errors.price = <font></font>;
        }
        
        return errors;
    };
    
    function handleChange(e)
    {
        setInput({...input, [e.target.name] : e.target.value});
        setErrors(validate({...input, [e.target.name] : e.target.value}));
    };
    
    function handleSubmit(e)
    {
        if(Object.keys(validate(input)).length > 0)
        {
            e.preventDefault();
            swal("Por favor, complete todos los campos correctamente.");
        }
        else
        {
            e.preventDefault();
            dispatch(EditArtwork(input));
        };
    };
    
    return(
            detail.artWork ?
            <div className={s.container}>
                <form className={s.form} onSubmit={handleSubmit}>
                <div className={s.container_complete}>
                    <div className={s.container_img}>
                        {
                            detail ?
                                <div className={s.container_img}>
                                    <img src={detail.artWork[0].imgCompress} />
                                </div>
                            :
                            null
                        }
                    </div>
                    <div className={s.container_info}>
                        <h4 className={s.title}>Modificar titulo</h4>
                        <input className={errors.title ? s.Alert : s.Inputs} placeholder="Máx. 20 carácteres" onChange={handleChange} type="text" value={input.title} maxLength={20} name="title"/>
                        {
                            errors.title && errors.title
                        }
                        
                        <h4 className={s.title}>Modificar contenido</h4>
                        <textarea className={errors.content ? s.Alert : s.Inputs} placeholder="Máx. 140 carácteres" onChange={handleChange} cols="30" rows="10" type="text" value={input.content} maxLength={140} name="content"/>
                        {
                            errors.content && errors.content
                        }
                        <div className={s.conteiner_input}>
                            <label className={s.title}>Modificar categoria</label>
                            <select className={errors.category ? s.Alert : s.Inputs} onChange={handleChange} name="category">
                                <option hidden>Selecciona una categoria</option>
                                {
                                    categories ? categories.map(e => (
                                        <option value={e.title} key={e.title}>{e.title}</option>
                                    ))
                                    :
                                    null
                                }
                            </select>
                        </div>
                        {
                            errors.category && errors.category
                        }
                        
                        <h4 className={s.title}>Modificar precio</h4>
                        <input className={errors.price ? s.Alert : s.Inputs} onChange={e => handleChange(e)} type="number" placeholder="USD" value={input.price} name="price"/>
                        {
                            errors.price && errors.price
                        }
                    </div>
                </div>
                    <button className={s.button} type="submit" >Guardar cambios</button>
                </form>
            </div>
            :
            <p>cargando...</p>
        );
};


export default Update;