import React from "react";
import s from './categories.module.css'


const Categories = (title) => {
    return (
            <button className={s.category}>{title.title}</button>
    );
};
export default Categories;