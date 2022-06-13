import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardAdm from "../../../components/admin/cardsart/cardadm.jsx"
import Filters from "../../../components/filters/filters.js";
import { CleanPosts, CleanStatus, setPage} from "../../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";



const Posts = () => {
    const allPosts = useSelector((state) => state.posts);
    const status = useSelector((state) => state.status)
    const length = useSelector((state) => state.length)
    const hasMore = useSelector((state) => state.hasMore);
    const dispatch = useDispatch();
    const page = useSelector((state) => state.page)

    useEffect(() =>{
        return () => {
            dispatch(CleanPosts())     
        };
    },[])


    useEffect(() => {
        dispatch(CleanStatus())
    }, [status]);



    return (
        <div>
            <Filters hasorder={false}/>
    


<InfiniteScroll
        dataLength={allPosts.length}
        hasMore={hasMore}
        next={() => dispatch(setPage())}
        loader={<h4>Cargando...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Wow! Parece que llegaste al fin!</b>
          </p>
        }
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
}


export default Posts


