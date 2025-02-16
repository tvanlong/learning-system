import { ComponentProps } from 'react'
export const IconDoubleRightArrow = (props: ComponentProps<'svg'>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-4' {...props}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5' />
    </svg>
  )
}
