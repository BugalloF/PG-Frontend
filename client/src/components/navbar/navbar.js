import React from 'react';
import s from '../navbar/navbar.module.css'
import { SearchBar } from '../searchbar/searchbar';
import { NavLink } from 'react-router-dom'
import { ImageProfile } from '../imageprofile/imageprofile';

const image = "https://rochester.kidsoutandabout.com/sites/default/files/digitalartadvanced.png"

export function NavBar(){
    return (

        <div className={s.container}>
          <div className={s.left}>
          <ul className={s.container_links}>
                <li>Home</li>
                <li>Recommended</li>
               
            </ul>
          </div>
            <div className={s.right}>
            <div className={s.container_searchbar}><SearchBar/></div>
            <div className={s.container_image}>
            <ImageProfile image={image} bigSize={false}/>
            </div>
            </div>
           
        </div>
    )
}