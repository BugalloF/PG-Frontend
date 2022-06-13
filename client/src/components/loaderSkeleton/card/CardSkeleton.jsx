import Skeleton from 'react-loading-skeleton'
import s from "./CardSkeleton.module.css";



const CardSkeleton = () => {

  const widths = [260,622,350,500,437]


  const randomWidth = () => {
    let random = Math.floor(Math.random() * widths.length);
    let res=widths[random]
    return res
  };
  
    return (
      <div className={s.container_card}>
        <Skeleton width={randomWidth()} height={350} />
        
        <div className={s.user}>
          <div className={s.user_left}>
            <Skeleton circle width={41} height={41} />

            <div className={s.left_list}>
              <Skeleton height={18} width={70}/>
              <Skeleton height={18} width={80}/>  
            </div>
          </div>
          <div className={s.user_right}>
              <Skeleton className={s.price} height={25} width={50}/>
              <Skeleton height={16} width={120}/>              
          </div>

        </div>  

      </div>
    
    );
};
export default CardSkeleton;