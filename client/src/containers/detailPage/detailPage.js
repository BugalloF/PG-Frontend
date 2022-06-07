import React from "react";
import {Detail} from "../../components/detail/detail";
import Comment from "../../components/comment/comment";
import Card from "../../components/cards/card";
import s from './detailPage.module.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faStoreAlt } from "@fortawesome/free-solid-svg-icons";
import { CleanDetail, GetDetail } from "../../redux/actions";
import { useParams } from "react-router-dom";

// --------------------------------------------------------
// -----------------------DATOS DE PRUEBA-------------
// --------------------------------------------------------

const comentariosTest=[
  {
    nombre: 'User1',
    fotoPerfil: 'https://i.pinimg.com/originals/52/3c/28/523c28df9d1371c1dd0b2458b7212389.jpg',
    comentario: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo'
  },
  {
    nombre: 'User2',
    fotoPerfil: 'https://i.pinimg.com/originals/7b/1f/cf/7b1fcf3797198cbab3a28c1edcee39a4.jpg',
    comentario: 'consectetur adipisicing elit'
  },  
  {
    nombre: 'User3',
    fotoPerfil: 'https://i.pinimg.com/736x/d1/9d/64/d19d6430c339481cc9a0e3deaf251652.jpg',
    comentario: 'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'
  },
  {
    nombre: 'User4',
    fotoPerfil: 'https://i.pinimg.com/originals/05/04/af/0504af01404f06009507cbbde7fde1f9.jpg',
    comentario: 'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'
  }  
]




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
    let cards = [card, card2,card3, card2]

let userTest={
    nombre:'NOMBRE',
    perfil: 'https://cetram.org/wp-content/uploads/2020/08/6b854d6ba1c432a0129a84a93be32ad0.jpg',  
}

const detalleTest= {
    imagen:'https://getuikit.com/v2/docs/images/placeholder_600x400.svg',
    descripcion:'DESCRIPCIÓN Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }

// --------------------------------------------------------
// --------------------------------------------------------
// --------------------------------------------------------



export default function DetailPage() {

  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail)
  const {idPost} = useParams();
  const idPosteo = detail.artWork ? detail.artWork[0].id : undefined;
  const loggedUser = window.localStorage.getItem("userData");
  
  useEffect(() => {
    dispatch(GetDetail(loggedUser, idPost))

    return () => {
      dispatch(CleanDetail())
    };
    
  },[]);
  
  return(
    idPosteo?( <div className={s.container_detailPage}>
       <Detail image={detail.artWork[0].imgCompress} description={detail.artWork[0].content} user={detail.artWork[0].profile.userName} amountComm={comentariosTest.length} profile={detail.artWork[0].profile} price={detail.artWork[0].price} title={detail.artWork[0].title} idPost={idPost} likes ={detail.likesCounter}/>

       <div className={s.container_recommendation}>
         <h2>publicaciones recomendadas</h2>
           <div className={s.cardsRec}>
               {
                 cards?.map((card) => <Card post ={card}/>)
               }
           </div>
               
       </div>

     </div>):(<div><h1>cargando...</h1></div>)
 );
};