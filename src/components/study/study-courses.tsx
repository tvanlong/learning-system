'use client'
import { useEffect, useState } from 'react'

import { CourseGrid } from '@/components/common/course-grid'
import { CourseItem } from '@/components/course/course-item'
import { lastLessonKey } from '@/constants'
import { IStudyCourses } from '@/types'

interface IStudyCoursesProps {
  courses: IStudyCourses[] | null | undefined
}

interface ILastLesson {
  course: string
  lesson: string
}

export const StudyCourses = ({ courses }: IStudyCoursesProps) => {
  const [lastLesson, setLastLesson] = useState<ILastLesson[]>([])
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage ? JSON.parse(localStorage?.getItem(lastLessonKey) || '[]') || [] : []
      setLastLesson(data)
    }
  }, [])

  if (!courses || courses.length <= 0) return null

  return (
    <CourseGrid>
      {courses &&
        courses.length > 0 &&
        courses?.map((item) => {
          const url = lastLesson.find((el) => el.course === item.slug)?.lesson || ''
          const firstLessonUrl = item.lectures[0].lessons[0].slug
          return (
            <CourseItem
              key={item.slug}
              data={item}
              cta='Tiếp tục học'
              url={url || `/${item.slug}/lesson?slug=${firstLessonUrl}`}
            />
          )
        })}
    </CourseGrid>
  )
}

export default StudyCourses
