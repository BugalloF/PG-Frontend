import React from "react";
import Card from "../../components/cards/card";
import { useDispatch, useSelector } from "react-redux";
import s from "./feedpage.module.css";
import { GetAllCategories, GetAllPosts, Post } from "../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import Categories from "../../components/categories/categories";
import { useEffect } from "react";

const PrincipalPage = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts);
  const allCategories = useSelector((state) => state.categories);
  const search = useSelector((state) => state.search);
  const length = useSelector((state) => state.length);
  const [page, setPage] = useState(0);

  //objeto de prueba para carta
  useEffect(() => {
    dispatch(GetAllPosts());
    dispatch(GetAllCategories());
  }, []);

  useEffect(() => {
    dispatch(GetAllPosts(page, search, allPosts));
  }, [page, search]);

  return (
    <InfiniteScroll
      dataLength={length}
      hasMore={true}
      next={() => setPage((page) => page + 1)}
      loader={<h1>loading...</h1>}
    >
      <div className={s.FeedPage}>
        <div className={s.CategoryZone}>
          {allCategories?.map((cat) => (
            <Categories title={cat.title} />
          ))}
        </div>

        <div className={s.Cards}>
          {allPosts.map((card) => (
            <Card
              postId={card.id}
              img={card.img}
              userImg={card.profile.img}
              userId={card.profileId}
              userName={card.profile.name}
            />
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default PrincipalPage;
