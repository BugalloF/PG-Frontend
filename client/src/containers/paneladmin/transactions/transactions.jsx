import { React, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {GetTransactions, setPage } from "../../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchBar } from "../../../components/searchbar/searchbar.js";
import { useLocation } from "react-router-dom";
import CardTransactions from "../../../components/admin/transactions/transactions.jsx";



const Transactions = () => {
    const all = useSelector((state) => state.transactions);
    const status = useSelector((state) => state.status);
    const page = useSelector((state => state.page))
    const dispatch = useDispatch();
    const name = useLocation()

    useEffect(() =>{
        return () => {
            // dispatch(CleanPosts())     
        };
    },[])


    useEffect(() => {
        // dispatch(getUsers())
        dispatch(GetTransactions())
    }, [page,status,name.search]);

    console.log(all)


    return (
        all ? 
        <div>

            <SearchBar/>




<InfiniteScroll
        dataLength={all.length}
        hasMore={false}
        next={() => dispatch(setPage())}
        loader={<h4>Cargando...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Wow! Parece que llegaste al fin!</b>
          </p>
        }
      >

          
             {all?.map(card => (
                <CardTransactions
                price={card.price}
                userSeller={card.userSeller}
                userPayer={card.userPayer}
                email={card.email}   
                title={card.title}             
                />
            )) } 
       

    
        
      </InfiniteScroll>
      
      
  
            
        </div>:<p>cargando</p>
    )
}


export default Transactions