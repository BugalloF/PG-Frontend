import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardProfile from "../../../components/admin/cardprofile/cardprofile.jsx";
import {  CleanStatus, GetAdmProfiles, setPage } from "../../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchBar } from "../../../components/searchbar/searchbar.js";
import { useLocation } from "react-router-dom";



const Users = () => {
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

    console.log(allUsers)


    return (
        <div>

            <SearchBar/>




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
}


export default Users