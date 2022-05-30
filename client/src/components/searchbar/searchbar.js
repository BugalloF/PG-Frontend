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

  
    return(
        
            <form className={s.container}>

                <div className={s.searchwrapper}>
                  <input 
                     value={artWork}
                     onChange={(e) => {setArtWork(e.target.value)}}
                     className={s.search} 
                     placeholder="Search"
                   />
                 <FontAwesomeIcon 
                 className={s.i} 
                 onClick={(e) => {
                   dispatch(resetPage())
                   navigate(`?name=${artWork}`)
                 }} 
                 icon={faMagnifyingGlass} />
               </div>

            </form>
        
    )
}