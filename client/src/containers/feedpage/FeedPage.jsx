import React, { useState } from "react";
import Card from "../../components/cards/card";
import { Link } from "react-router-dom";
import s from './feedpage.module.css'

const PrincipalPage = () => {
    //objeto de prueba para carta
    const card = {
        UserId: 'aas23c',
        PostId: 'ssddc123',
        Image: 'https://cdna.artstation.com/p/assets/images/images/022/096/022/large/meral-ali-girl-final-colours.jpg?1574103057',
        UserName: 'ElDemi',
    }
    const card2 = {
        UserId: 'aas23c',
        PostId: 'ssd3dc123',
        Image: 'http://prod-upp-image-read.ft.com/e9a0d7ee-a1be-11e8-85da-eeb7a9ce36e4',
        UserName: 'ElDemi',
    }
    const card3 = {
        UserId: 'aas23c',
        PostId: 'ssd3dcsc123',
        Image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlV0TjJylSULGDUxmoJXNOaBeXbOAwjA_o7V34pNjMwdgv-PJsZHMmRJ3qpxIsRoDik1k&usqp=CAU',
        UserName: 'ElDemi',
    }

    let cards = [card, card2,card3]
    React.useEffect(() => {
    }, []);
    return (
        <div className={s.FeedPage}>
            <div className={s.Cards}>
                {
                    cards?.map((card) => <Card post ={card}/>)
                }
            </div>
        </div>
    );
};
export default PrincipalPage;