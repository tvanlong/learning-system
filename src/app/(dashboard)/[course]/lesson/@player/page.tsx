import { auth } from '@clerk/nextjs/server'

import { Heading } from '@/components/common/heading'
import { LessonSaveUrl } from '@/components/lesson/lesson-save-url'
import { VideoPlayer } from '@/components/lesson/video-player'
import { getCourseBySlug } from '@/lib/actions/course.actions'
import { findAllLessons } from '@/lib/actions/lession.actions'
import { getUserInfo } from '@/lib/actions/user.actions'

interface IPageProps {
  params: {
    course: string
  }
  searchParams: {
    slug: string
  }
}

export async function generateMetadata({ params }: Omit<IPageProps, 'searchParams'>) {
  const data = await getCourseBySlug({ slug: params.course })

  if (!data) {
    return {
      title: 'Bài học không tồn tại',
      description: 'Bài học không tồn tại hoặc đã bị xóa',
      icons: '/logo.png'
    }
  }

  return {
    title: `${data.title}`,
    description: data.desc || 'Khóa học chi tiết trên nền tảng học tập',
    icons: '/logo.png'
  }
}

const page = async ({ params, searchParams }: IPageProps) => {
  const { userId } = auth()
  const findUser = await getUserInfo({ userId: userId! })
  const course = params.course
  const slug = searchParams.slug
  const findCourse = await getCourseBySlug({ slug: course })
  if (!findCourse) return null
  const courseId = findCourse?._id.toString()
  const lessonList = await findAllLessons({ course: courseId || '' })
  const lessonDetails = lessonList?.find((el) => el.slug === slug)
  if (!lessonDetails) return null
  const currentLessonIndex = lessonList?.findIndex((el) => el.slug === slug) || 0
  const nextLesson = lessonList?.[currentLessonIndex + 1]
  const prevLesson = lessonList?.[currentLessonIndex - 1]
  const videoId = lessonDetails.video_url?.split('v=').at(-1)

  return (
    <div>
      <LessonSaveUrl course={course} url={`/${course}/lesson?slug=${slug}`}></LessonSaveUrl>
      <VideoPlayer
        videoId={videoId}
        nextLesson={!nextLesson ? '' : `/${course}/lesson?slug=${nextLesson?.slug}`}
        prevLesson={!prevLesson ? '' : `/${course}/lesson?slug=${prevLesson?.slug}`}
        data={{
          userId: findUser?._id.toString() || '',
          courseId
        }}
      />
      <Heading className='mb-10'>{lessonDetails.title}</Heading>
      <div className='p-5 rounded-lg bgDarkMode border borderDarkMode entry-content mb-3'>
        <div dangerouslySetInnerHTML={{ __html: lessonDetails.content || '' }}></div>
      </div>
    </div>
  )
}

export default page
