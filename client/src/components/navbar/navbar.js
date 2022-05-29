import React from "react";
import s from "../navbar/navbar.module.css";
import { SearchBar } from "../searchbar/searchbar";
import { ImageProfile } from "../imageprofile/imageprofile";
import { NavLink } from "react-router-dom";
import { GetAllPosts } from "../../redux/actions";
import { useDispatch } from "react-redux";

const image =
  "https://rochester.kidsoutandabout.com/sites/default/files/digitalartadvanced.png";

export function NavBar() {
  const dispatch = useDispatch();
  return (
    <div className={s.container}>
      <div className={s.left}>
        <ul className={s.container_links}>
          <NavLink onClick={() => dispatch(GetAllPosts())} to={"/"}>
            <li>Home</li>
          </NavLink>
          <NavLink to={"/create"}>
            <li>New Post</li>
          </NavLink>
        </ul>
      </div>
      <div className={s.right}>
        <div className={s.container_searchbar}>
          <SearchBar />
        </div>
        <div className={s.container_image}>
          <ImageProfile image={image} bigSize={false} />
        </div>
      </div>
      <div className={s.blur}>

      </div>
    </div>
  );
}
