import React from "react";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import s from '../searchbar/searchbar.module.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPage } from "../../redux/actions";






export function SearchBar(){
    const [artWork,setArtWork] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()

  
++return(
        
           <form className={s.container} onSubmit={ (e) => { e.preventDefault() dispatch(resetPage()) navigate(`?name=${artWork}`) }}>

                <div className={s.searchwrapper}>
                  <input 
                     value={artWork}
                     onChange={(e) => {setArtWork(e.target.value)}}
                     className={s.search} 
                     placeholder="Search"
                   />
                 <button className={s.i}>
                 <FontAwesomeIcon 
                 className={s.i} 
                 onClick={(e) => {
                 e.preventDefault();
                 dispatch(SearchAll(arkWorks))
                 icon={faMagnifyingGlass} />
                 </button>
               </div>
            </form>
    )
}