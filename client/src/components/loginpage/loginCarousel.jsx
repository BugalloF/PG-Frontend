import React from "react";
import s from "./loginCarousel.module.css";

const LoginCarousel = ({ imgs }) => {
  const images = [
    "https://rochester.kidsoutandabout.com/sites/default/files/digitalartadvanced.png",
    "https://as1.ftcdn.net/v2/jpg/01/99/42/28/1000_F_199422875_2RLcAaIQ6S2G0yis7okytByh1SaB2ZNv.jpg",
    "https://cdnb.artstation.com/p/assets/images/images/031/147/759/large/andz-apilado-06-artfantasy2.jpg?1602741355",
    "https://wallpaperaccess.com/full/7280506.jpg",
  ];
  //en el return, vamos a verificar que la constante json del usuario tenga datos, asi renderiza la carta, si no, no la renderiza aun
  return (
    <div className={s.loginCarousel}>
      <div className={s.darkener}></div>
      <div className={s.carouselZone}>
        {images?.map((e, index) => (
          <div className={s.imgContainer} style={{marginLeft: `${-15 + 30 * index}vw`}}>
            <img src={e} alt="" style={{ height: "100%" }} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default LoginCarousel;
