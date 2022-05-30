import React from "react";
import s from './categories.module.css'


const Categories = (title) => {
    return (
            <button className={s.container}>{title.title}</button>
    );
};
export default Categories;