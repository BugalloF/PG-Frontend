import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardProfile from "../../../components/admin/cardprofile/cardprofile.jsx";
import {  CleanStatus, GetAdmProfiles, setPage } from "../../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchBar } from "../../../components/searchbar/searchbar.js";
import { useLocation } from "react-router-dom";
import s from "../users/users.module.css"
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";


const Users = () => {
    const loggedUser = window.localStorage.getItem("userData");
    const userDataJson = JSON.parse(loggedUser);
    const allUsers = useSelector((state) => state.users);
    const status = useSelector((state) => state.status);
    const page = useSelector((state => state.page))
    const dispatch = useDispatch();
    const name = useLocation()

    useEffect(() =>{
        return () => {
            // dispatch(CleanPosts())     
        };
    },[])


    useEffect(() => {
        // dispatch(getUsers())
        dispatch(GetAdmProfiles(page,name.search))
        dispatch(CleanStatus())
    }, [page,status,name.search]);

    if(userDataJson.is_Admin){
        return (
            <div className={s.container}>
        
          <NavLink to={'/paneladm'}><div className={s.arrow}><FontAwesomeIcon icon={faCircleArrowLeft}/></div></NavLink>
          
    
      


    <div>
        <ul className={s.list}>
            <li>Perfil</li>
            <li>Nombre</li>
            <li>Email</li>
            <li>Borrar</li>
            <li>Ban</li>
            <li>Fecha</li>
            
        </ul>
    </div>
    
    
    <div className={s.searchbar}><SearchBar/></div>
    
    <InfiniteScroll
            dataLength={allUsers.length}
            hasMore={false}
            next={() => dispatch(setPage())}
            loader={<h4>Cargando...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Wow! Parece que llegaste al fin!</b>
              </p>
            }
          >
    
              
                 {allUsers?.map(card => (
                    <CardProfile
                    userId={card.id}
                    userName={card.userName}
                    userImg={card.img}
                    firstName={card.name}
                    lastName={card.lastName}
                    email={card.email}   
                    ban={card.is_banned}             
                    banTime={card.banned_time}             
                    />
                )) } 
           
    
        
            
          </InfiniteScroll>
          
          
      
                
            </div>
        )
    }else{

    }
}


export default Users