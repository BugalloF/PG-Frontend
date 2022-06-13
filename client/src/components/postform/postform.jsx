// Dependencies
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert";
import {ThreeDots} from  'react-loader-spinner'
// Files
import {CleanStatus, GetAllCategories, Post} from "../../redux/actions";
import s from "../postform/postform.module.css";
import iconoUp from './iconupload.png'

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
        imguploaded: null,
    });
    const [loadPost, setLoadPost] = useState(false)
    
    const navigate = useNavigate();
    
    useEffect(() => dispatch(GetAllCategories()), []);
    useEffect(() => {

       if(status === 201){
        setInput({
            id: "",
            title: "",
            content: "",
            price: "",
            img: "",
            category: "",
            input: [],
        });
        swal("La obra fue publicada correctamente!");
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
        
        reader.onloadend = function(event)
        {
            console.log(input.imguploaded)
            // console.log(e.target.files);
            setInput({...input, img: [...e.target.files], input: [...e.target.files], imguploaded: [event.target.result]});
        };
    };
    
    async function handleSubmit(e)
    {
        e.preventDefault();
        dispatch(Post(input));
        setLoadPost(true)

    };
    
    
    return(
        <div className={s.container}>
            <form className={s.form} onSubmit={e => handleSubmit(e)}>
            <div className={s.container_complete}>
                <div className={s.container_img}>
                    <h4>Obra</h4>
                    <img className={s.icon_upload} src={iconoUp} alt="subir" />
                    {
                       input.imguploaded !== null?( <img className={s.uploaded} src={input.imguploaded} />):(console.log('no existe img'))
                    }
                    <p>Subir una imagen</p>
                    <input onChange={e => handleChangeFile(e)} type="file" accept=".jpg, .jpeg, .png" /*value={input.img}*/ name="img" disabled={loadPost}/>
                </div>
                
                <div className={s.container_info}>
                    <h4 className={s.title}>Titulo</h4>
                    <input className={s.input} onChange={e => handleChange(e)} type="text" value={input.title} maxLength={20} name="title" disabled={loadPost}/>
                    
                    <h4 className={s.title}>Contenido</h4>
                    <textarea className={`${s.input} ${s.input_content}`} onChange={e => handleChange(e)} cols="30" rows="10" type="text" value={input.content} maxLength={140} name="content" disabled={loadPost}/>
                    
                    <div className={s.conteiner_input}>
                        <label className={s.title}>Categoria</label>
                        <select className={s.select} onChange={e => handleChange(e)} name="category" disabled={loadPost}>
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
                    <input className={`${s.input} ${s.input_price}`} onChange={e => handleChange(e)} type="text" value={input.price} name="price" disabled={loadPost}/>
                </div>                
            </div>

                {loadPost?
                    <button className={s.btnLoad} disabled><ThreeDots className={s.loadDots} color="#FFF" height={20} /></button>
                    :<button className={s.button} type="submit" >Publicar</button>
                }
            </form>
        </div>
    );
};


export default PostForm;