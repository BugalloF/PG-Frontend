import React from "react";
import s from "./loginCarousel.module.css";

const LoginCarousel = ({ imgs }) => {
  const images = [
    "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3906112/pexels-photo-3906112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/7120424/pexels-photo-7120424.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3311473/pexels-photo-3311473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
