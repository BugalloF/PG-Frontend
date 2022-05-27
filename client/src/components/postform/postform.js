import React from 'react';
import s from '../postform/postform.module.css'
import { useState } from 'react';
import { GetAllCategories } from '../../redux/actions';
import { useDispatch, useSelector} from 'react-redux';
import axios from 'axios';


export function PostForm(props) {

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    
    React.useEffect(() => {
       dispatch(GetAllCategories())
    },[]);

    //  modify = false : crear post  | modify = true : update o delete post
    const [modify, SetModify] = useState(false);
    const [inputs, setInputs] = useState({
        title: "",
        content: "",
        price: "",
        img: "",
        category: ""

    })

    const HandlerPost = (e) =>{
        e.preventDefault()
        axios.post(`https://artpage-api.herokuapp.com/art`, inputs)
        .then(r => {
            console.log(r)
        })
    }

    return (
        
        <div className={s.container}>
            
       <form className={s.form}>

           {/* se renderiza un input para cargar la imagen si modify esta en false, si no se llama a la imagen de el post */}
            {/* {!modify ? <div className={s.container_img}>
                <input className={s.input_img} type='file'/>
            </div>: <img src={props.image}/>} */}
            <div className={s.container_img}>
            <h6>Image</h6>
            <input
             type='text'
             value={inputs.img} 
             onChange={(e) => setInputs({...inputs,img: e.target.value})} 
            />
            </div>
            <div className={s.container_info}>
                <h6 className={s.title}>Title</h6>
                <input  
                className={s.input} 
                type='text'
                value={inputs.title} 
                onChange={(e) => setInputs({...inputs,title: e.target.value})} 
                />
                <h6 className={s.title}>Content</h6>
                <textarea 
                className={`${s.input} ${s.input_content}`} 
                cols="30" 
                rows="10" 
                type='text'
                value={inputs.content} 
                onChange={(e) => setInputs({...inputs,content: e.target.value})} 
                />
                <div className={s.conteiner_input}>
                  <label className={s.title} >Category</label>
                       <select 
                       className={s.select}
                       onChange={(e) => setInputs({...inputs,category: e.target.value})} 
                       defaultValue=''
                    >
                    <option disabled value=''>Select an option</option>
                    
                    {categories ? categories.map(e => <option value={e.title}>{e.title}</option>):null}
                      </select>
                      

                </div>
             
                <h6 className={s.title}>Price</h6>
                <input 
                className={s.input}  
                type='text'
                value={inputs.price} 
                onChange={(e) => setInputs({...inputs,price: e.target.value})}
                />
                <button 
                className={s.button} 
                type='submit'
                onClick={(e) => HandlerPost(e)}
                >Create</button>
                {/* se renderiza boton de delet si modify = true */}
                {modify ? <button className={s.button} type='submit'>Delete</button>: null}
            </div>
       </form>
            
        </div>
    )
}

