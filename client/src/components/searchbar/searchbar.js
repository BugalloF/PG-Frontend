import React from "react";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import s from '../searchbar/searchbar.module.css'


export function SearchBar(){
    return(
        <div className={s.container}>
            <form>
               
                <div className={s.searchwrapper}>
                  <input 
                     
                     className={s.search} 
                     placeholder="Search"
                   />
                 <FontAwesomeIcon className={s.i} icon={faMagnifyingGlass} />
               </div>

            </form>
        </div>
    )
}