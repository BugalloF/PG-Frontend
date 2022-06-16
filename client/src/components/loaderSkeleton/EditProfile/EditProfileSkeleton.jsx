import Skeleton from 'react-loading-skeleton'
import s from "./EditProfileSkeleton.module.css";

function EditProfileSkeleton() {
	return (
		<div className={s.container_edit}>
			<Skeleton className={s.title} width={200} height={40}/>
			<Skeleton circle width={38} height={38}/>
			<Skeleton width={260} height={21}/>
			<div className={s.form}>
				<div className={s.left}>
					<Skeleton className={s.input} width={300}/>
					<Skeleton className={s.input} width={300}/>
					<Skeleton className={s.input} width={300}/>
					<Skeleton className={s.input} width={300}/>
					<Skeleton className={s.input} width={300}/>
					<Skeleton className={s.input} width={300}/>
					<Skeleton className={s.input} width={300}/>
					<Skeleton className={s.input} width={300}/>
					<Skeleton className={s.input} width={300}/>
				</div>
				<div className={s.rigth}>
					<Skeleton className={s.input_desc} width={500}/>
					<Skeleton className={s.input} width={500}/>
					<Skeleton className={s.input} width={500}/>
					<Skeleton className={s.input} width={500}/>
				</div>
			</div>
			<Skeleton width={160} height={36}/>
		</div>
	)
}

export default EditProfileSkeleton