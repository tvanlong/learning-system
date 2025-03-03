import type { Metadata } from 'next'

import { CourseManage } from '@/components/course/course-manage'
import { getAllCourses } from '@/lib/actions/course.actions'
import { ECourseStatus } from '@/types/enums'

export const metadata: Metadata = {
  title: 'Quản lý khóa học',
  description: 'Quản lý khóa học',
  icons: '/logo.png'
}

interface IPageProps {
  searchParams: {
    page: number
    search: string
    status: ECourseStatus
  }
}

const page = async ({ searchParams }: IPageProps) => {
  const courses = await getAllCourses({
    page: searchParams.page || 1,
    limit: 10,
    search: searchParams.search,
    status: searchParams.status
  })
  return <CourseManage courses={courses ? JSON.parse(JSON.stringify(courses)) : []} />
}

export default page
