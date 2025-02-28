import type { Metadata } from 'next'

import { Heading } from '@/components/common/heading'
import { CourseAddNew } from '@/components/course/course-add-new'

export const metadata: Metadata = {
  title: 'Thêm khóa học',
  description: 'Thêm khóa học',
  icons: '/logo.png'
}

const page = () => {
  return (
    <>
      <Heading>Thêm khóa học</Heading>
      <CourseAddNew />
    </>
  )
}

export default page
