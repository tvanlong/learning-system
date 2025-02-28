import type { Metadata } from 'next'

import { Heading } from '@/components/common/heading'
import { CourseUpdateContent } from '@/components/course/course-update-content'
import { getCourseBySlug } from '@/lib/actions/course.actions'

export const metadata: Metadata = {
  title: 'Cập nhật nội dung khóa học',
  description: 'Cập nhật nội dung khóa học',
  icons: '/logo.png'
}

interface IPageProps {
  searchParams: {
    slug: string
  }
}

const page = async ({ searchParams }: IPageProps) => {
  const findCourse = await getCourseBySlug({ slug: searchParams.slug })
  if (!findCourse) return <div>Không tìm thấy khóa học</div>

  return (
    <>
      <Heading className='mb-10'>
        Nội dung: <strong className='text-primary'>{findCourse.title}</strong>
      </Heading>
      <CourseUpdateContent course={JSON.parse(JSON.stringify(findCourse))}></CourseUpdateContent>
    </>
  )
}
export default page
