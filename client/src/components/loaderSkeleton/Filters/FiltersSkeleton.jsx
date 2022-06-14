import Skeleton from 'react-loading-skeleton'
import s from './FiltersSkeleton.module.css'

const FiltersSkeleton = () => {

    return (
      <>
        <div className={s.Categories_skeleton}>
          
          <Skeleton className={s.item_category} width={130} />
          <Skeleton className={s.item_category} width={134} />
          <Skeleton className={s.item_category} width={130} />
          <Skeleton className={s.item_category} width={130} />
          <Skeleton className={s.item_category} width={130} />
        </div>

        <div className={s.Filters_skeleton}>
          <Skeleton className={s.item_filter} width={230} />
          <Skeleton className={s.item_filter} width={266} />
          <Skeleton className={s.item_filter} width={214} />
        </div>
    </>
    
    );
};
export default FiltersSkeleton;