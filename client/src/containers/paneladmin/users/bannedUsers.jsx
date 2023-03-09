import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardProfile from "../../../components/admin/cardprofile/cardprofile.jsx";
import {  CleanStatus, getBannedUsers } from "../../../redux/actions";



const BannedUsers = () => {
    const loggedUser = window.localStorage.getItem("userData");
    const userDataJson = JSON.parse(loggedUser);
    const allUsers = useSelector((state) => state.users);
    const status = useSelector((state) => state.status)
    const dispatch = useDispatch();
    const [page,setPage] = useState(0);
    const [order,setOrder] = useState({
        by: "",
        type: ""
      });

    useEffect(() =>{
        return () => {
            // dispatch(CleanPosts())     
        };
    },[])
    
    useEffect(() => {
        dispatch(getBannedUsers(loggedUser))
        dispatch(CleanStatus())
    }, [page,status,allUsers]);
// const fechita = new Date(allUsers[0].banned_time)
allUsers ? allUsers.sort((a, b) => new Date(a.banned_time) - new Date(b.banned_time)) : console.log('no')




    if(userDataJson.is_Admin){
        return (
            <div>
          
                 <button 
                 onClick={() => {
                    setPage((prevPage) => page - 1)
                    
                    }}>→</button>
                 <button 
                 onClick={() =>{ 
                    setPage((prevPage) => page + 1)
                    
                    }}>←</button>
        
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
                
            </div>
        )
    }else{

    }
}


export default BannedUsers