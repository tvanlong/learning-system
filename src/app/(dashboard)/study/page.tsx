import { auth } from '@clerk/nextjs/server'

import { Heading } from '@/components/common/heading'
import { StudyCourses } from '@/components/study/study-courses'
import { getUserCourses } from '@/lib/actions/user.actions'

const page = async () => {
  const { userId } = auth()
  const courses = await getUserCourses(userId || '')

  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <StudyCourses courses={courses ? JSON.parse(JSON.stringify(courses)) : []} />
    </>
  )
}

export default page
