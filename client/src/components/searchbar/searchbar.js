import React from "react";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import s from '../searchbar/searchbar.module.css'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchAll } from "../../redux/actions";



export function SearchBar(){
  const [arkWorks, setArtWorks] = useState("");
  const dispatch = useDispatch()
    return(
        <div className={s.container}>
            <form>

                <div className={s.searchwrapper}>
                  <input 
                     value={arkWorks}
                     onChange={(e) => setArtWorks(e.target.value)}
                     className={s.search} 
                     placeholder="Search"
                   />
                 <FontAwesomeIcon 
                 className={s.i} 
                 onClick={(e) => {
                   e.preventDefault();
                   dispatch(SearchAll(arkWorks))
                 
                 }} 
                 icon={faMagnifyingGlass} />
               </div>

            </form>
        </div>
    )
}