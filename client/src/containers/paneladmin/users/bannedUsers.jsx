import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardBanned from "../../../components/admin/cardbanned/cardbanned.jsx";
import {  CleanStatus, getBannedUsers } from "../../../redux/actions";



const BannedUsers = () => {
    const allUsers = useSelector((state) => state.users);
    const status = useSelector((state) => state.status)
    const dispatch = useDispatch();
    const [page,setPage] = useState(0);
    const [order,setOrder] = useState({
        by: "",
        type: ""
      });
const loggedUser = window.localStorage.getItem("userData");

    useEffect(() => {
        dispatch(getBannedUsers(loggedUser))
        dispatch(CleanStatus())
    }, [page,status]);
// console.log(allUsers)
// const fechita = new Date(allUsers[0].banned_time)
allUsers ? allUsers.sort((a, b) => new Date(a.banned_time) - new Date(b.banned_time)) : console.log('no')
// console.log('aaaaaaaa',orde);
// console.log('aaaaaaaabbbb',fechita);
    // console.log(orde,'aaaaaaaa');
    // console.log(allUsers)


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
                <CardBanned
                userId={card.id}
                userName={card.userName}
                userImg={card.img}
                firstName={card.name}
                lastName={card.lastName}
                email={card.email}   
                ban={card.is_banned}             
                banTime={card.banned_time} 
                key={card.id}            
                />
            )) }
            
        </div>
    )
}


export default BannedUsers