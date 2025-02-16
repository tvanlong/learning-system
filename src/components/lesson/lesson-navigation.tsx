'use client'

import { useRouter } from 'next/navigation'

import { IconLeftArrow } from '@/components/icons/icon-left-arrow'
import { IconRightArrow } from '@/components/icons/icon-right-arrow'
import { Button } from '@/components/ui/button'

interface ILessonNavigationProps {
  nextLesson: string
  prevLesson: string
}

export const LessonNavigation = ({ nextLesson, prevLesson }: ILessonNavigationProps) => {
  const router = useRouter()

  return (
    <div className='flex gap-3'>
      <Button
        className='size-10 p-3'
        disabled={!prevLesson}
        onClick={() => (!prevLesson ? null : router.push(prevLesson))}
      >
        <IconLeftArrow />
      </Button>
      <Button
        className='size-10 p-3'
        disabled={!nextLesson}
        onClick={() => (!nextLesson ? null : router.push(nextLesson))}
      >
        <IconRightArrow />
      </Button>
    </div>
  )
}
