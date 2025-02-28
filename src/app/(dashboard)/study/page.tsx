import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'

import { Heading } from '@/components/common/heading'
import { StudyCourses } from '@/components/study/study-courses'
import { getUserCourses } from '@/lib/actions/user.actions'

export const metadata: Metadata = {
  title: 'Khu vực học tập',
  description: 'Khu vực học tập',
  icons: '/logo.png'
}

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
