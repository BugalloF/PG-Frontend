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

import CardsSkeleton from "../../components/loaderSkeleton/cards/CardsSkeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const PrincipalPage = () => {
  const dispatch = useDispatch();
  const length = useSelector((state) => state.length)
  const allPosts = useSelector((state) => state.posts);
  const hasMore = useSelector((state) => state.hasMore);
  const loader = useSelector((state) => state.loader);
  const notFound = useSelector((state) => state.notFound);

  useEffect(() => {
      dispatch(resetPage());
      
      return () => {
        // dispatch(CleanPosts());
        window.scrollTo(0,0); 
      };
    
  }, []);
  

  return (
    <div className={s.container}>

      <InfiniteScroll
        dataLength={allPosts.length}
        hasMore={hasMore}
        next={() => dispatch(setPage())}
        loader={allPosts.length !== length || !notFound?<CardsSkeleton oneLine={true}/>:null}
        endMessage={allPosts.length == length && allPosts.length>=12?
          <p style={{ textAlign: "center" }}>
            <b>Wow! Parece que llegaste al fin!</b>
          </p>:null
        }
      >
        <div className={s.FeedPage}>

      {loader?
        <CardsSkeleton oneLine={false}/> :
        notFound ?<NotFound/>:
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
          </div>
        }
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PrincipalPage;
