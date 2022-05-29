// Dependencies
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert";
// Files
import {GetAllCategories, Post} from "../../redux/actions";
import s from "../postform/postform.module.css";


function PostForm()
{
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    const [input, setInput] = useState({
        id: "e3da1099-a6aa-4395-a12c-f5868d0c3ed3",
        title: "",
        content: "",
        price: "",
        img: "",
        category: "",
        input: [],
    });
    
    const navigate = useNavigate();
    
    useEffect(() => dispatch(GetAllCategories()), [dispatch]);
    
    function handleChange(e)
    {
        setInput({...input, [e.target.name] : e.target.value});
        // setErrors(validate({...input, [e.target.name] : e.target.value}));
        console.log(input);
    };
    
    function handleChangeFile(e)
    {
        const reader = new FileReader();
        const file = e.target.files[0];
        // console.log(file);

        reader.readAsDataURL(file);
        
        reader.onload = function(event)
        {
            console.log(e.target.files);
            setInput({...input, img: event.target.result, input: [...e.target.files]});
        };
    };
    
    async function handleSubmit(e)
    {
        e.preventDefault();
        dispatch(Post(input));
        setInput({
            id: "94170069-fa65-442f-8a24-dd522d8a365c",
            title: "",
            content: "",
            price: "",
            img: "",
            category: "",
            input: [],
        });
        swal("The artwork was successfully uploaded!");
        navigate("/");
    };
    
    
    return(
        <div className={s.container}>
            <form className={s.form} onSubmit={e => handleSubmit(e)}>
                <div className={s.container_img}>
                    <h4>Image</h4>
                    <input onChange={e => handleChangeFile(e)} type="file" accept=".jpg, .jpeg, .png" /*value={input.img}*/ name="img"/>
                </div>
                
                <div className={s.container_info}>
                    <h4 className={s.title}>Title</h4>
                    <input className={s.input} onChange={e => handleChange(e)} type="text" value={input.title} name="title"/>
                    
                    <h4 className={s.title}>Content</h4>
                    <textarea className={`${s.input} ${s.input_content}`} onChange={e => handleChange(e)} cols="30" rows="10" type="text" value={input.content} name="content"/>
                    
                    <div className={s.conteiner_input}>
                        <label className={s.title}>Category</label>
                        <select className={s.select} onChange={e => handleChange(e)} name="category">
                            <option hidden>Select one category</option>
                            {
                                categories ? categories.map(e => (
                                    <option value={e.title} key={e.title}>{e.title}</option>
                                ))
                                :
                                null
                            }
                        </select>
                    </div>
                    
                    <h4 className={s.title}>Price</h4>
                    <input className={s.input} onChange={e => handleChange(e)} type="text" value={input.price} name="price"/>
                </div>
                
                <button className={s.button} type="submit" >Upload</button>
            </form>
        </div>
    );
};


export default PostForm;