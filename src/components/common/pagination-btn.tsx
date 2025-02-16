import { IconLeftArrow } from '@/components/icons/icon-left-arrow'
import { IconRightArrow } from '@/components/icons/icon-right-arrow'
import { commonClassNames } from '@/constants'

export const PaginationBtn = () => {
  return (
    <div className='flex justify-end gap-3 mt-5'>
      <button className={commonClassNames.paginationButton}>
        <IconLeftArrow />
      </button>
      <button className={commonClassNames.paginationButton}>
        <IconRightArrow />
      </button>
    </div>
  )
}
