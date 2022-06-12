import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardProfile from "../../../components/admin/cardprofile/cardprofile.jsx";
import {  CleanStatus, getUsers } from "../../../redux/actions";



const Users = () => {
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
        dispatch(getUsers())
        dispatch(CleanStatus())
    }, [page,status]);

    console.log(allUsers)


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
                />
            )) }
            
        </div>
    )
}


export default Users