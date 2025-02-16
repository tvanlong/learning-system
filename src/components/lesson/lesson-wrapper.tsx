'use client'

import useGlobalStore from '@/store'

interface ILessonWrapperProps {
  children: React.ReactNode
}

export const LessonWrapper = ({ children }: ILessonWrapperProps) => {
  const { expandedPlayer } = useGlobalStore()

  return (
    <div
      className='block xl:grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 items-start'
      style={{
        display: expandedPlayer ? 'block' : 'grid'
      }}
    >
      {children}
    </div>
  )
}
