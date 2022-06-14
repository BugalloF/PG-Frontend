import React from "react";
import Skeleton from 'react-loading-skeleton'
import s from "./DetailSkeleton.module.css";
import CardSkeleton from "../card/CardSkeleton"

const DetailSkeleton = (props) => {
  const heigth = [260,622,350,500,437]


  const randomHeigth = () => {
    let random = Math.floor(Math.random() * heigth.length);
    let res=heigth[random]
    return res
  };
  
    return (
      <div className={s.main_container}>
      	<div className={s.detail_target}>
      	    
      		<div className={s.left}>
	      		<Skeleton width={600} height={randomHeigth()}/>
	      		<div className={s.buttons}>
		      		<Skeleton width={150} height={25}/>
		      		<Skeleton width={85} height={92}/>
	      		</div>
      		</div>

	      	<div className={s.rigth}>
		    	<div className={s.profileZone}>
		    		<Skeleton circle width={55} height={55}/>
		    		<Skeleton width={90} height={23}/>
		    	</div>
            <Skeleton height={23} width={200}/>
  		    	<div className={s.info}>
              <Skeleton count={3} height={23}/>
            </div>
            <Skeleton height={23} width={80}/>      			
	      	</div>     
      	</div>
      	<div className={s.recommendation}>
		    <Skeleton className={s.recTitle} width={500} height={34}/>
		    <CardSkeleton />
		    <CardSkeleton />	      			
      	</div>
      </div>
    
    );
};
export default DetailSkeleton;