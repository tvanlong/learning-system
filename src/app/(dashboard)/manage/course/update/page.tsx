import { Heading } from '@/components/common/heading'
import { CourseUpdate } from '@/components/course/course-update'
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
    <>
      <Heading className='mb-8'>Cập nhật khóa học</Heading>
      <CourseUpdate data={JSON.parse(JSON.stringify(findCourse))} />
    </>
  )
}

export default page
