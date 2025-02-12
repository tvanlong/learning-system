'use client'

import useQueryString from '@/hooks/useQueryString'
import { debounce } from 'lodash'
import { IconDoubleLeftArrow, IconDoubleRightArrow, IconLeft, IconRight } from '../icons'
import { ITEMS_PER_PAGE } from '@/constants'

interface IPaginationProps {
  totalPages: number
  total: number
}

const Pagination = ({ totalPages, total }: IPaginationProps) => {
  const { handleChangePage, currentPage } = useQueryString()
  const onInputChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value < 1) return
    handleChangePage(Number(e.target.value))
  }, 250)

  if (total <= ITEMS_PER_PAGE) return null

  return (
    <div className='mt-10 flex items-center justify-center gap-3'>
      <PaginationButton onClick={() => handleChangePage(1)} disabled={currentPage === 1}>
        <IconDoubleLeftArrow />
      </PaginationButton>
      <PaginationButton disabled={currentPage === 1} onClick={() => handleChangePage(currentPage - 1)}>
        <IconLeft />
      </PaginationButton>
      <input
        type='number'
        placeholder='1'
        value={currentPage}
        className='w-20 h-10 rounded-full bg-white outline-none text-center px-2 font-medium'
        onChange={onInputChange}
      />
      <PaginationButton onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage === totalPages}>
        <IconRight />
      </PaginationButton>
      <PaginationButton disabled={currentPage === totalPages} onClick={() => handleChangePage(totalPages)}>
        <IconDoubleRightArrow />
      </PaginationButton>
    </div>
  )
}
interface IPaginationButtonProps {
  onClick: () => void
  disabled: boolean
  children: React.ReactNode
}
function PaginationButton({ onClick, disabled, children }: IPaginationButtonProps) {
  const paginationBtnClassNames =
    'size-10 rounded-full bg-white shadow-sm p-2 flex items-center justify-center disabled:bg-gray-200'
  return (
    <button className={paginationBtnClassNames} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
export default Pagination
