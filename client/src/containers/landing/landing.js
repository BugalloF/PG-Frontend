import React from "react";
import { Carrucel } from "../../components/carrucel/carrucel";
import { Categories } from "../../components/categories/categories";
import s from '../landing/landing.module.css';

const image = ['https://www.allabouttailormadetravel.com/wp-content/uploads/2020/04/Road-to-Hermanus.jpg','https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800','https://cdn.kimkim.com/files/a/content_articles/featured_photos/6da29bd9a066fc6bcff4b1f3f0712cfd351f2683/big-a5840bc0c3ad45bb07cf29b5b917967d.jpg'];
const categories = [{name:'autos',image:'img1'},{name:'art1',image:'img2'},{name:'motos',image:'img3'},{name:'queseyo',image:'img4'}]
export function LandingPage() {
    return(
        <div>
            <Carrucel image={image}/>
            
           <div className={s.container_categories}>
           {categories.map( e => (
                 <Categories 
                 name ={e.name}
                 image ={e.image}
                 />
            ))}
           </div>
        </div>
    )
}