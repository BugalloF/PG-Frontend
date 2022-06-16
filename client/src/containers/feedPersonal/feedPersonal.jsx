// Dependencies
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
// Files
import {setPage, resetPage, getFollowedPost, cleanFollowedPosts} from "../../redux/actions";
import Card from "../../components/cards/card";
import NotFound from "../../components/notFound/NotFound";
import CardsSkeleton from "../../components/loaderSkeleton/cards/CardsSkeleton";
import s from "../feedpage/feedpage.module.css";


const MyFeed = () => {
  const loggedUser = window.localStorage.getItem("userData");
  const dispatch = useDispatch();
  const followPost = useSelector((state) => state.followedPosts);
  const hasMore = useSelector((state) => state.hasMore);
  const loader = useSelector((state) => state.loader);
  const page = useSelector((state) => state.page);
  const notFound = useSelector((state) => state.notFound);


  useEffect(() => {
      dispatch(getFollowedPost(page,loggedUser))
      window.scrollTo(0,0); 
  }, [page])

  useEffect(() => {
    return () => {
      dispatch(resetPage());
      // dispatch(cleanFollowedPosts());
      window.scrollTo(0,0); 
    };
  }, [dispatch]);

  if(loggedUser && followPost.length> 0)
  {
    return (
      <div>
        <div className={s.FeedPage}>
        {
          loader ? <CardsSkeleton oneLine={false}/>
          :
          notFound ? <NotFound/>
          :
          <div className={s.Cards}>
            {
              followPost.map((card) => (
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
      </div>
    );
  }
  else
  {
    return(<div className={s.notf}>
      <h2>....Oh, algo salió mal. ¿Sigues a algún usuario? En caso de ser afirmativo, puede que no tengan publicaciones aún.</h2>
    </div>);
  };
};

export default MyFeed;