import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardAdm from "../../../components/admin/cardsart/cardadm.jsx"
import { CleanPosts, CleanStatus, GetAllPosts, getUsers } from "../../../redux/actions";



const Posts = () => {
    const allPosts = useSelector((state) => state.posts);
    const status = useSelector((state) => state.status)
    const dispatch = useDispatch();
    const [page,setPage] = useState(0);
    const [order,setOrder] = useState({
        by: "",
        type: ""
      });
    useEffect(() =>{
        return () => {
            dispatch(CleanPosts())     
        };
    },[])


    useEffect(() => {
        dispatch(GetAllPosts(page,undefined, order.by, order.type));
        dispatch(CleanStatus())
    }, [page,status]);



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

            {allPosts?.map(card => (
            
                <CardAdm
                postId={card.id}
                img={card.imgCompress}
                userImg={card.profile?.img}
                userId={card.profile?.id}
                userName={card.profile?.userName}
                price={card.price}
                title={card.title}
                 
                />
            ))}

            
        </div>
    )
}


export default Posts


