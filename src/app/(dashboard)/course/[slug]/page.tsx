import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'

import PageNotFound from '@/app/not-found'
import { AlreadyEnroll } from '@/components/course/already-enroll'
import { CourseWidget } from '@/components/course/course-widget'
import { IconEye } from '@/components/icons/icon-eye'
import { IconLevel } from '@/components/icons/icon-level'
import { IconPlay } from '@/components/icons/icon-play'
import { IconTime } from '@/components/icons/icon-time'
import { LessonContent } from '@/components/lesson/lesson-content'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { courseLevelTitle } from '@/constants'
import { getCourseBySlug, getCourseLessonsInfo, updateCourseView } from '@/lib/actions/course.actions'
import { getUserInfo } from '@/lib/actions/user.actions'
import { ECourseStatus } from '@/types/enums'
import { formatMinutesToHour } from '@/utils'

interface IPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: IPageProps) {
  const data = await getCourseBySlug({ slug: params.slug })

  if (!data) {
    return {
      title: 'Khóa học không tồn tại',
      description: 'Khóa học không tồn tại hoặc đã bị xóa',
      icons: '/logo.png'
    }
  }

  return {
    title: `${data.title}`,
    description: data.desc || 'Khóa học chi tiết trên nền tảng học tập'
  }
}

const page = async ({ params }: IPageProps) => {
  await updateCourseView({ slug: params.slug })
  const data = await getCourseBySlug({ slug: params.slug })
  if (!data) return null
  if (data.status !== ECourseStatus.APPROVED) return <PageNotFound />

  const { userId } = auth()
  const findUser = await getUserInfo({ userId: userId || '' })
  const userCourses = findUser?.courses.map((c: any) => c.toString())
  const videoId = data.intro_url?.split('v=')[1]
  const lectures = data.lectures || []
  const totalLesson = lectures.reduce((acc, cur) => {
    return acc + cur.lessons.length
  }, 0)
  const { duration, lessons }: any = await getCourseLessonsInfo({
    slug: data.slug
  })
  const ratings = data.rating.map((r: any) => r.content)

  return (
    <div className='grid lg:grid-cols-[2fr,1fr] gap-10'>
      <div>
        <div className='relative aspect-video mb-5'>
          {data.intro_url ? (
            <>
              <iframe
                width='853'
                height='480'
                src={`https://www.youtube.com/embed/${videoId}`}
                title='BLACK MYTH WUKONG New Insane Combat Preview and Gameplay Demo | EXCLUSIVE PS5 and PC Launch'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                className='w-full h-full object-fill rounded-lg'
              ></iframe>
            </>
          ) : (
            <Image src={data.image} alt='' fill className='w-full h-full object-cover rounded-lg' />
          )}
        </div>
        <div className='flex flex-wrap gap-2 mb-5'>
          {ratings.map((rating: string, index: number) => (
            <div
              key={index}
              className='p-2 px-4 text-sm font-semibold rounded-full text-white bg-gradient-to-tr from-primary to-secondary'
            >
              {rating}
            </div>
          ))}
        </div>
        <h1 className='font-bold text-xl md:text-3xl my-8'>{data?.title}</h1>
        <BoxSection title='Mô tả'>
          <p className='leading-relaxed text-justify text-sm md:text-base'>{data.desc}</p>
        </BoxSection>
        <BoxSection title='Thông tin'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mb-10'>
            <BoxInfo title='Bài học' icon={<IconPlay className='size-5' />}>
              {lessons}
            </BoxInfo>
            <BoxInfo title='Lượt xem' icon={<IconEye className='size-5' />}>
              {data.views.toLocaleString()}
            </BoxInfo>
            <BoxInfo title='Trình độ' icon={<IconLevel className='size-5' />}>
              {courseLevelTitle[data.level]}
            </BoxInfo>
            <BoxInfo title='Thời lượng' icon={<IconTime className='size-5' />}>
              {formatMinutesToHour(duration)}
            </BoxInfo>
          </div>
        </BoxSection>
        <BoxSection title='Nội dung khóa học'>
          <LessonContent lectures={lectures} course='' slug='' />
        </BoxSection>
        <BoxSection title='Yêu cầu'>
          {data.info.requirements.map((r, index) => (
            <div key={index} className='mb-3 flex items-center gap-2'>
              <span className='flex-shrink-0 size-5 bg-primary rounded-full text-white p-1 flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                </svg>
              </span>
              <span className='text-sm md:text-base'>{r}</span>
            </div>
          ))}
        </BoxSection>
        <BoxSection title='Lợi ích'>
          {data.info.requirements.map((r, index) => (
            <div key={index} className='mb-3 flex items-center gap-2'>
              <span className='flex-shrink-0 size-5 bg-primary rounded-full text-white p-1 flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                </svg>
              </span>
              <span className='text-sm md:text-base'>{r}</span>
            </div>
          ))}
        </BoxSection>
        <BoxSection title='Q.A'>
          {data.info.qa.map((qa, index) => (
            <Accordion type='single' collapsible key={index}>
              <AccordionItem value={qa.question}>
                <AccordionTrigger className='text-sm md:text-base text-left'>{qa.question}</AccordionTrigger>
                <AccordionContent className='text-sm md:text-base text-justify'>{qa.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </BoxSection>
      </div>
      <div>
        {userCourses?.includes(data._id.toString()) ? (
          <AlreadyEnroll />
        ) : (
          <CourseWidget
            data={data ? JSON.parse(JSON.stringify(data)) : null}
            findUser={findUser ? JSON.parse(JSON.stringify(findUser)) : null}
            totalLesson={totalLesson}
            duration={formatMinutesToHour(duration)}
          />
        )}
      </div>
    </div>
  )
}

function BoxInfo({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className='bgDarkMode rounded-lg p-5 border borderDarkMode'>
      <h4 className='text-sm font-normal mb-2'>{title}</h4>
      <div className='flex items-center gap-1'>
        {icon}
        <h3 className='text-sm font-medium'>{children}</h3>
      </div>
    </div>
  )
}

function BoxSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <h2 className='font-bold text-xl mb-5'>{title}</h2>
      <div className='mb-10'>{children}</div>
    </>
  )
}
export default page
