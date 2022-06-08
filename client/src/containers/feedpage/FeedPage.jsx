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


const PrincipalPage = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts);
  const hasMore = useSelector((state) => state.hasMore);
  const filterState = useSelector((state) => state.filter);
  const loader = useSelector((state) => state.loader);

  useEffect(() => {
    return () => {
      dispatch(resetPage());
      dispatch(CleanPosts());
    };
  }, [dispatch]);
  
  useEffect(() => {
    return () => {
      dispatch(CleanPosts());
    };
  }, [filterState]);  

  return (
    <div>
      <Filters />

      <InfiniteScroll
        dataLength={allPosts.length}
        hasMore={hasMore}
        next={() => dispatch(setPage())}
        loader={!loader?<h4>Cargando...</h4>:null}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Wow! Parece que llegaste al fin!</b>
          </p>
        }
      >
        <div className={s.FeedPage}>

      {loader?
        <div><h2>Cargando...</h2></div>
        :allPosts.length?
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
