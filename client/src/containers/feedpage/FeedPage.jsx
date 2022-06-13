import React from "react";
import Card from "../../components/cards/card";
import { useDispatch, useSelector } from "react-redux";
import s from "./feedpage.module.css";
import {
  setPage,
  CleanPosts,
  resetPage,
} from "../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import NotFound from "../../components/notFound/NotFound"
import Filters from "../../components/filters/filters"
import CardsSkeleton from "../../components/loaderSkeleton/cards/CardsSkeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const PrincipalPage = () => {
  const dispatch = useDispatch();
  const length = useSelector((state) => state.length)
  const allPosts = useSelector((state) => state.posts);
  const hasMore = useSelector((state) => state.hasMore);
  const loader = useSelector((state) => state.loader);

  useEffect(() => {
      dispatch(resetPage());
      
      return () => {
        dispatch(CleanPosts());
      };
    
  }, []);
  

  return (
    <div  className={s.container}>
      <div className={s.imgContainer}></div>
      <Filters hasorder={false}/>

      <InfiniteScroll
        dataLength={allPosts.length}
        hasMore={hasMore}
        next={() => dispatch(setPage())}
        loader={allPosts.length !== length?<CardsSkeleton oneLine={true}/>:null}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Wow! Parece que llegaste al fin!</b>
          </p>
        }
      >
        <div className={s.FeedPage}>

      {loader?
        <CardsSkeleton oneLine={false}/> :
        length !== 0 ?
          <div className={s.Cards}>
            
            {allPosts.map((card) => (
              <Card
                postId={card.id}
                img={card.imgCompress}
                userImg={card.profile?.img}
                userId={card.profile?.id}
                userName={card.profile?.userName}
                country={card.profile?.country}
                price={card.price}
                title={card.title}
              />
            ))
          }
          </div>:<NotFound/>
        }
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PrincipalPage;
