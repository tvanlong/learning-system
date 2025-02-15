import React from 'react'

import Heading from '@/components/common/Heading'
import CourseUpdate from '@/components/course/CourseUpdate'
import { getCourseBySlug } from '@/lib/actions/course.actions'

interface IPageProps {
  searchParams: {
    slug: string
  }
}

const page = async ({ searchParams }: IPageProps) => {
  const findCourse = await getCourseBySlug({ slug: searchParams.slug })
  if (!findCourse) return null

  return (
    <div>
      <Heading className='mb-8'>Cập nhật khóa học</Heading>
      <CourseUpdate data={JSON.parse(JSON.stringify(findCourse))} />
    </div>
  )
}

export default page
