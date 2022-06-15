// Dependencies
import {React, useEffect, useState} from "react";
import {useLocation, NavLink,Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";
// Files
import {CleanStatus, CleanUsers, GetAdmProfiles, resetPage, setPage} from "../../../redux/actions";
import {SearchBar} from "../../../components/searchbar/searchbar.js";
import CardProfile from "../../../components/admin/cardprofile/cardprofile.jsx";
import s from "../users/users.module.css"


const Users = () => {
    const loggedUser = window.localStorage.getItem("userData");
    const userDataJson = JSON.parse(loggedUser);
    const isAdmin = userDataJson ? userDataJson.is_Admin : false;
    const allUsers = useSelector((state) => state.users);
    const status = useSelector((state) => state.status);
    const page = useSelector((state => state.page));
    const dispatch = useDispatch();
    const name = useLocation();
    const hasMore = useSelector((state) => state.hasMore);
    
    useEffect(() => {
        return () => {
            dispatch(CleanUsers());
            dispatch(resetPage());
        };
    }, []);
    
    allUsers.sort(function (a, b){
        return b.is_banned - a.is_banned;
    });
    
    useEffect(() => {
        dispatch(GetAdmProfiles(page,name.search));
        dispatch(CleanStatus());
    }, [page, status, name.search]);
    
    if(isAdmin)
    {
        return (
            <div className={s.container}>
                <NavLink to={'/paneladm'}>
                    <div className={s.arrow}>
                        <FontAwesomeIcon icon={faCircleArrowLeft}/>
                    </div>
                </NavLink>
                
                <div>
                    <ul className={s.list}>
                        <li>Perfil</li>
                        <li>Nombre</li>
                        <li>Email</li>
                        <li>Borrar</li>
                        <li>Ban</li>
                        <li>Fecha</li>
                    </ul>
                </div>
                
                <div className={s.searchbar}>
                    <SearchBar/>
                </div>
                
                <InfiniteScroll
                    dataLength={allUsers.length}
                    hasMore={hasMore}
                    next={() => dispatch(setPage())}
                    loader={<h4>Cargando...</h4>}
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        <b>Wow! Parece que llegaste al fin!</b>
                      </p>
                    }
                >
                
                {
                    allUsers?.map(card => (
                        <CardProfile
                            userId={card.id}
                            userName={card.userName}
                            userImg={card.img}
                            firstName={card.name}
                            lastName={card.lastName}
                            email={card.email}
                            ban={card.is_banned}
                            banTime={card.banned_time}
                        />
                    ))
                }
                
                </InfiniteScroll>
            </div>
        );
    }
    else
    {
        return(<Navigate to="/"/>);
    };
};


export default Users;