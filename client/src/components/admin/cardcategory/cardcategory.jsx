import React from "react";



const CardCategory = ({category}) => {
    return (
        <div>
            <ul>
                <li>{category}</li>
                <li><button>x</button></li>
                <li><button>editar</button></li>
            </ul>
        </div>
    )
}


export default CardCategory