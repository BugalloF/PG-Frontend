// Dependencies
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, Navigate} from "react-router-dom";
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
    const [errors, setErrors] = useState({});
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
        if(status === 201)
        {
            setInput({
                id: "",
                title: "",
                content: "",
                price: "",
                img: "",
                category: "",
                input: [],
        });
        swal({
            text: "La obra fue publicada correctamente!",
            icon: "success",
        });
        navigate(`/profile/${id}`);
        };
       dispatch(CleanStatus());
    }, [status]);
    
    function validate(input)
    {
        const errors = {};
        
        if(!input.img)
        {
            errors.img = <p></p>;
        }
        else if(!input.title)
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
        else if(input.content.length > 240)
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
    
    function handleChangeFile(e)
    {
        const reader = new FileReader();
        const file = e.target.files[0];
        
        reader.readAsDataURL(file);
        
        reader.onloadend = function(event)
        {
            setInput({...input, img: [...e.target.files], input: [...e.target.files], imguploaded: [event.target.result]});
        };
    };
    
    function handleSubmit(e)
    {
        const image = input.img && input.img[0].type.split("/").pop();
        
        if(Object.keys(validate(input)).length > 0)
        {
            e.preventDefault();
            swal({
                text: "Por favor, complete todos los campos correctamente.",
                icon: "warning",
            });
        }
        else
        {
            if(image !== "jpg" && image !== "jpeg" && image !== "png" && image !== "svg" && image !== "bmp" && image !== "raw" && image !== "tiff" && image !== "JPG" && image !== "JPEG" && image !== "PNG" && image !== "SVG" && image !== "BMP" && image !== "RAW" && image !== "TIFF")
            {
                e.preventDefault();
                swal({
                    text: "Por favor, adjunte una extensión de imagen permitida (jpg, jpeg, png, svg, bmp, raw, tiff)",
                    icon: "warning",
                });
                setInput({...input, img: "", input: [], imguploaded: null});
            }
            else
            {
                e.preventDefault();
                dispatch(Post(input));
                setLoadPost(true);
            };
        };
    };
    
    if(loggedUser)
    {
        return(
            <div className={s.container}>
                <form className={s.form} onSubmit={handleSubmit}>
                <div className={s.container_complete}>
                    <div className={s.container_img}>
                        <h4>Obra</h4>
                        <img className={s.icon_upload} src={iconoUp} alt="subir" />
                        {
                           input.imguploaded !== null && <img className={s.uploaded} src={input.imguploaded} />
                        }
                        <p>Subir una imagen</p>
                        <input onChange={handleChangeFile} type="file" accept=".jpg, .jpeg, .png, .svg, .bmp, .raw, .tiff" /*value={input.img}*/ name="img" disabled={loadPost}/>
                        {
                            errors.img && errors.img
                        }
                    </div>
                    
                    <div className={s.container_info}>
                        <h4 className={s.title}>Titulo</h4>
                        <input className={errors.title ? s.Alert : s.Inputs} placeholder="Máx. 20 carácteres" onChange={handleChange} type="text" value={input.title} maxLength={20} name="title" disabled={loadPost}/>
                        {
                            errors.title && errors.title
                        }
                        <h4 className={s.title}>Contenido</h4>
                        <textarea className={errors.content ? s.Alert : s.Inputs} placeholder="Máx. 240 carácteres" onChange={handleChange} cols="30" rows="10" type="text" value={input.content} maxLength={240} name="content" disabled={loadPost}/>
                        {
                            errors.content && errors.content
                        }
                        <h4 className={s.title}>Categoria</h4>
                        <div className={s.conteiner_input}>
                            <select className={errors.category ? s.Alert : s.Inputs} onChange={handleChange} name="category" disabled={loadPost}>
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
                        
                        <h4 className={s.title}>Precio</h4>
                        <input className={errors.price ? s.Alert : s.Inputs} onChange={handleChange} type="number" value={input.price} name="price" placeholder="USD" disabled={loadPost}/>
                        {
                            errors.price && errors.price
                        }
                    </div>
                </div>
                
                {
                    loadPost ? <button className={s.btnLoad} disabled><ThreeDots className={s.loadDots} color="#FFF" height={20} /></button>
                    :
                    <button className={s.button} type="submit" >Publicar</button>
                }
                </form>
            </div>
        );
    }
    else
    {
        return(<Navigate to="/login"/>);
    };
};


export default PostForm;