import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardAdm from "../../../components/admin/cardsart/cardadm.jsx"
import Filters from "../../../components/filters/filters.js";
import { CleanPosts, CleanStatus, resetPage, setPage} from "../../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchBar } from "../../../components/searchbar/searchbar.js";
import s from "../posts/posts.module.css"
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";


const Posts = () => {
    const loggedUser = window.localStorage.getItem("userData");
    const userDataJson = JSON.parse(loggedUser);
    const allPosts = useSelector((state) => state.posts);
    const status = useSelector((state) => state.status)
    const length = useSelector((state) => state.length)
    const hasMore = useSelector((state) => state.hasMore);
    const dispatch = useDispatch();
    const page = useSelector((state) => state.page)
    allPosts.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    useEffect(() =>{
        return () => {
            dispatch(CleanPosts())
            dispatch(resetPage())     
        };
    },[])




    if(userDataJson.is_Admin){
      return (
        <div className={s.container}>
        
            <NavLink to={'/paneladm'}><div className={s.arrow}><FontAwesomeIcon icon={faCircleArrowLeft}/></div></NavLink>
    
            <Filters hasorder={false}/>
       

            <div>
        <ul className={s.list}>
            <li>Perfil</li>
            <li>Precio</li>
            <li>Titulo</li>
            <li>Categoria</li>
            <li>Like</li>
            <li>Imagen</li>
            <li>Borrar</li>
            
        </ul>
       </div>

       <div className={s.searchbar}><SearchBar/></div>
    


<InfiniteScroll
        dataLength={allPosts.length}
        hasMore={hasMore}
        next={() => dispatch(setPage())}
        
      >
       

        {allPosts?.map(card => (
            
            <CardAdm
            postId={card.id}
            img={card.imgCompress}
            userImg={card.profile?.img}
            userId={card.profile?.id}
            userName={card.profile?.userName}
            price={card.price}
            title={card.title}
            category={card.categories[0].title}
            likes={card.likes}
             
            />
        ))}
        
      </InfiniteScroll>

            
        </div>
    )

    }else{

    }

  }


export default Posts


