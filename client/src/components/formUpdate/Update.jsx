// Dependencies
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate,useParams} from "react-router-dom";
import swal from "sweetalert";
// Files
import {CleanStatus, EditArtwork, GetAllCategories, GetDetail} from "../../redux/actions";
import s from "../postform/postform.module.css";

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
    
    const [input, setInput] = useState({
        id: "",
        title: "",
        content: "",
        price: "",
        category: "",
        input: [],
    });
    
    const navigate = useNavigate();
    
    useEffect(() =>{
        dispatch(GetAllCategories()),
        dispatch(GetDetail(loggedUser, idPost))
    }, []);

    useEffect(()=>{
        if(detail.artWork){
            setInput(
                {id: idPost,
                title: detail.artWork[0].title,
                content: detail.artWork[0].content,
                price: detail.artWork[0].price,
                category: "",
                input: [],
            })
        }
    },[detail])

    useEffect(() => {
       if(status === 201){
        swal("La obra fue modificada correctamente!");
        navigate("/");
       }
       dispatch(CleanStatus())
    }, [status]);
    
    function handleChange(e)
    {
        setInput({...input, [e.target.name] : e.target.value});
        // setErrors(validate({...input, [e.target.name] : e.target.value}));
    };

    async function handleSubmit(e)
    {
        e.preventDefault();
        dispatch(EditArtwork(input))
        setInput({
            id: idPost,
            title: "",
            content: "",
            price: "",
            category: "",
            input: [],
        });
    };
    
    return(
            detail.artWork ?
            <div className={s.container}>
                <form className={s.form} onSubmit={e => handleSubmit(e)}>
                <div className={s.container_complete}>
                    <div className={s.container_img}>
                        {
                        detail ? 
                            <div className={s.container_img}>
                                <img src={detail.artWork[0].imgCompress} />
                            </div> 
                        :   null
                        }
                    </div>
                    <div className={s.container_info}>
                        <h4 className={s.title}>Modificar titulo</h4>
                        <input className={s.input} onChange={e => handleChange(e)} type="text" value={input.title} name="title"/>
                        
                        <h4 className={s.title}>Modificar contenido</h4>
                        <textarea className={`${s.input} ${s.input_content}`} onChange={e => handleChange(e)} cols="30" rows="10" type="text" value={input.content} name="content"/>
                        
                        <div className={s.conteiner_input}>
                            <label className={s.title}>Modificar categoria</label>
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
                        
                        <h4 className={s.title}>Modificar precio</h4>
                        <input className={`${s.input} ${s.input_price}`} onChange={e => handleChange(e)} type="text" value={input.price} name="price"/>
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