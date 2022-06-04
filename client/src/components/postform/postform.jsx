// Dependencies
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert";
// Files
import {CleanStatus, GetAllCategories, Post} from "../../redux/actions";
import s from "../postform/postform.module.css";


function PostForm()
{
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    const status = useSelector(state => state.status);
    const loggedUser = window.localStorage.getItem("userData");
    const userDataJson = JSON.parse(loggedUser);
    const id = userDataJson ? userDataJson.id : "";
    const [input, setInput] = useState({
        id: id,
        title: "",
        content: "",
        price: "",
        img: "",
        category: "",
        input: [],
    });
    
    const navigate = useNavigate();
    
    useEffect(() => dispatch(GetAllCategories()), []);
    useEffect(() => {

       if(status === 201){

        swal("The artwork was successfully uploaded!");
        navigate("/");

       }

       dispatch(CleanStatus())

    }, [status]);
    
    function handleChange(e)
    {
        setInput({...input, [e.target.name] : e.target.value});
        // setErrors(validate({...input, [e.target.name] : e.target.value}));
       
    };
    
    function handleChangeFile(e)
    {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.readAsDataURL(file);
        
        reader.onload = function(event)
        {
            // console.log(e.target.files);
            setInput({...input, img: [...e.target.files], input: [...e.target.files]});
        };

    
        
    };
    
    async function handleSubmit(e)
    {
        e.preventDefault();
        dispatch(Post(input));
        setInput({
            id: "",
            title: "",
            content: "",
            price: "",
            img: "",
            category: "",
            input: [],
        });
    
    };
    
    
    return(
        <div className={s.container}>
            <form className={s.form} onSubmit={e => handleSubmit(e)}>
                <div className={s.container_img}>
                    <h4>Obra</h4>
                    <input onChange={e => handleChangeFile(e)} type="file" accept=".jpg, .jpeg, .png" /*value={input.img}*/ name="img"/>
                </div>
                
                <div className={s.container_info}>
                    <h4 className={s.title}>Titulo</h4>
                    <input className={s.input} onChange={e => handleChange(e)} type="text" value={input.title} name="title"/>
                    
                    <h4 className={s.title}>Contenido</h4>
                    <textarea className={`${s.input} ${s.input_content}`} onChange={e => handleChange(e)} cols="30" rows="10" type="text" value={input.content} name="content"/>
                    
                    <div className={s.conteiner_input}>
                        <label className={s.title}>Categoria</label>
                        <select className={s.select} onChange={e => handleChange(e)} name="category">
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
                    
                    <h4 className={s.title}>Precio</h4>
                    <input className={s.input} onChange={e => handleChange(e)} type="text" value={input.price} name="price"/>
                </div>
                
                <button className={s.button} type="submit" >Publicar</button>
            </form>
        </div>
    );
};


export default PostForm;