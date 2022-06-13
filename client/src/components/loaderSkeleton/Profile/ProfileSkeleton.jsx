import Skeleton from 'react-loading-skeleton'
import CardSkeleton from '../card/CardSkeleton'
import s from "./ProfileSkeleton.module.css"

const ProfileSkeleton = () => {
    return (
    	<div>
	   		<div className={s.profile_container}>
		    	<div className={s.profile_top}>
			      <div className={s.profile}>
			      	<Skeleton circle width={38} height={38}/>
			      	<Skeleton width={90} height={28}/>
			      </div>
			      <div className={s.follows}>
			      	<div className={s.follows_text}>
				      	<Skeleton width={160} height={29}/>
				      	<Skeleton width={150} height={29}/>		      		
			      	</div>

			      	<Skeleton width={49} height={79}/>
			      </div>     		
		    	</div>

		    	<Skeleton className={s.description} width={280} height={29}/>
				<div className={s.profile_bottom}>
		    		<Skeleton circle width={47} height={47}/>
		    		<Skeleton circle width={47} height={47}/>
		    		<Skeleton circle width={47} height={47}/>
		    		<Skeleton circle width={47} height={47}/>
				</div>
	    	</div> 
	    	<div className={s.posts}>
		    	<CardSkeleton/>   
		    	<CardSkeleton/>  
		    	<CardSkeleton/>  		
	    	</div>
    	</div>
    );
};
export default ProfileSkeleton;