import CardSkeleton from '../card/CardSkeleton'
import s from "./CardsSkeleton.module.css"

const CardsSkeleton = (props) => {

  let cant = [1,2,3,4,5,6,7,8]
  	if (props.oneLine === false) {
	    return (
	      <div className={s.container_cards_skeleton}>
	      {cant.map((e)=>(
	        <CardSkeleton />        
	        ))

	      }
	      </div>
	    );  		
  	} else {
	    return (
	      <div className={s.container_cards_skeleton}>
	        <CardSkeleton />
	        <CardSkeleton />
	        <CardSkeleton />  
	      </div>
	    );    		
  	}

};
export default CardsSkeleton;