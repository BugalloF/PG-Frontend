// Dependencies
import {React, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useLocation, Navigate} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";
// Files
import {CleanStatus, CleanTransactions, GetTransactions, resetPage, setPage} from "../../../redux/actions";
import {SearchBar} from "../../../components/searchbar/searchbar";
import CardTrans from "../../../components/admin/cardtransactions/cardtransactions";
import s from "../transactions/transactions.module.css";


const Transactions = () => {
  const loggedUser = window.localStorage.getItem("userData");
  const userDataJson = JSON.parse(loggedUser);
  const isAdmin = userDataJson ? userDataJson.is_Admin : false;
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);
  const status = useSelector((state) => state.status);
  const name = useLocation();
  const page = useSelector((state) => state.page);
  const hasMore = useSelector((state) => state.hasMore);
  
  transactions.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
  
  useEffect(() => {
    return () => {
      dispatch(CleanTransactions());
      dispatch(resetPage());
    };
  }, []);
  
  useEffect(() => {
    dispatch(GetTransactions(page,name.search));
    dispatch(CleanStatus());
  }, [status,page,name.search]);
  
  if(isAdmin)
  {
    return (
      <div className={s.container}>
        <NavLink to={'/paneladm'}>
          <div className={s.arrow}>
            <FontAwesomeIcon icon={faCircleArrowLeft}/>
          </div>
        </NavLink>
        
        <div className={s.cards}>
          <div>
            <ul className={s.list}>
              {/* <li>Id</li> */}
              <li>Vendedor</li>
              <li>Comprador</li>
              <li>Precio</li>
              <li>Titulo</li>
              <li>Email</li>
              <li>Fecha</li>
              <li>Pago</li>
            </ul>
          </div>
          
          <div className={s.searchbar}><SearchBar/></div>
        </div>
        
        <InfiniteScroll
          dataLength={transactions.length}
          hasMore={hasMore}
          next={() => dispatch(setPage())}
        >
        
        {
          transactions?.map(card => (
            <CardTrans
              id = {card.id}
              userSeller = {card.userSeller}
              userPayer = {card.userPayer}
              title = {card.title}
              email = {card.email}
              price = {card.price}
              isPayed = {card.isPayed}
              createdAt = {card.createdAt}
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


export default Transactions;