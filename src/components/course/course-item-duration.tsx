'use client'

import { useEffect, useState } from 'react'

import { IconClock } from '@/components/icons/icon-clock'
import { getCourseLessonsInfo } from '@/lib/actions/course.actions'
import { formatMinutesToHour } from '@/utils'

interface ICourseItemDurationProps {
  slug: string
}

export function CourseItemDuration({ slug }: ICourseItemDurationProps) {
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    async function getDuration() {
      const response = await getCourseLessonsInfo({ slug })
      setDuration(response?.duration || 0)
    }
    getDuration()
  }, [slug])

  return (
    <div className='flex items-center gap-2'>
      <IconClock className='size-4' />
      <span>{formatMinutesToHour(duration)}</span>
    </div>
  )
}
