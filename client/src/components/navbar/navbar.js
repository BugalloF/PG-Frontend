import React from 'react';
import s from '../navbar/navbar.module.css'
import { SearchBar } from '../searchbar/searchbar';
import { NavLink } from 'react-router-dom'
import { ImageProfile } from '../imageprofile/imageprofile';


export function NavBar(){
    return (
        <div className={s.container}>
          <div className={s.left}>
          <ul className={s.container_links}>
                <li>Lorem</li>
                <li>Ipsum</li>
                <li>Toramt</li>
            </ul>
          </div>
            <div className={s.right}>
            <div className={s.container_searchbar}><SearchBar/></div>
            <ImageProfile/>
            </div>
        </div>
    )
}