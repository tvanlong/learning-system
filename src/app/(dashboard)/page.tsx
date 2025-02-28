import type { Metadata } from 'next'

import { CourseGrid } from '@/components/common/course-grid'
import { Heading } from '@/components/common/heading'
import { CourseItem } from '@/components/course/course-item'
import { getAllCoursesPublic } from '@/lib/actions/course.actions'

export const metadata: Metadata = {
  title: 'Ucademy - Nền tảng học trực tuyến hàng đầu Việt Nam',
  description: 'Ucademy - Nền tảng học trực tuyến hàng đầu Việt Nam',
  icons: '/logo.png'
}

const page = async () => {
  const courses = (await getAllCoursesPublic({})) || []

  return (
    <>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {courses.length > 0 && courses.map((course) => <CourseItem key={course.slug} data={course} />)}
      </CourseGrid>
    </>
  )
}

export default page
