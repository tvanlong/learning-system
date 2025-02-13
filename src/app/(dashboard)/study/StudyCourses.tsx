'use client'
import { CourseGrid } from '@/components/common'
import CourseItem from '@/components/course/CourseItem'
import { lastLessonKey } from '@/constants'
import { IStudyCourses } from '@/types'

const StudyCourses = ({ courses }: { courses: IStudyCourses[] | null | undefined }) => {
  if (!courses || courses.length <= 0) return null

  let lastLesson: { course: string; lesson: string }[] = []

  if (typeof localStorage !== 'undefined') {
    lastLesson = JSON.parse(localStorage?.getItem(lastLessonKey) || '[]') || []
  }

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
            ></CourseItem>
          )
        })}
    </CourseGrid>
  )
}

export default StudyCourses
