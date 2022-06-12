import React from "react";
import Card from "../../components/cards/card";
import { useDispatch, useSelector } from "react-redux";
import s from "../feedpage/feedpage.module.css";
import {
  setPage,
  resetPage,
  getFollowedPost,
  cleanFollowedPosts,
} from "../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import NotFound from "../../components/notFound/NotFound"


const MyFeed = () => {
  const loggedUser = window.localStorage.getItem("userData");

  const dispatch = useDispatch();
  const followPost = useSelector((state) => state.followedPosts);
  const hasMore = useSelector((state) => state.hasMore);
  const loader = useSelector((state) => state.loader);
  const page = useSelector((state) => state.page);


  useEffect(() => {
      dispatch(getFollowedPost(page,loggedUser))
    return () => {
      dispatch(resetPage());
      dispatch(cleanFollowedPosts());
    };
  }, [dispatch]);

  return (
    <div>

      <InfiniteScroll
        dataLength={followPost.length}
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
        :followPost.length?
          <div className={s.Cards}>
            
            {followPost.map((card) => (
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

export default MyFeed;