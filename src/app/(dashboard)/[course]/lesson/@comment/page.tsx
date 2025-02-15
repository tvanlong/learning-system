import { auth } from '@clerk/nextjs/server'

import { getCommentsByLesson } from '@/lib/actions/comment.actions'
import { getCourseBySlug } from '@/lib/actions/course.actions'
import { getLessonBySlug } from '@/lib/actions/lession.actions'
import { getUserInfo } from '@/lib/actions/user.actions'
import { formatTotalComments } from '@/utils'

import CommentField from './CommentField'
import CommentForm from './CommentForm'
import CommentSorting from './CommentSorting'

interface ICommentPageProps {
  params: {
    course: string
  }
  searchParams: {
    slug: string
    sort: 'recent' | 'oldest'
  }
}

const page = async ({ params, searchParams }: ICommentPageProps) => {
  const { userId } = auth()
  const findUser = await getUserInfo({ userId: userId! })
  const course = params.course
  const slug = searchParams.slug
  const findCourse = await getCourseBySlug({ slug: course })
  if (!findCourse) return null
  const lesson = await getLessonBySlug({
    slug: slug,
    course: findCourse?._id.toString()
  })

  const comments = await getCommentsByLesson(lesson?._id.toString() || '', searchParams.sort)
  const commentLessonId = lesson?._id.toString() || ''
  const commentUserId = findUser?._id.toString() || ''
  const rootComments = comments?.filter((item) => !item.parentId)

  return (
    <>
      <CommentForm lessonId={commentLessonId} userId={commentUserId} />
      {rootComments && rootComments?.length > 0 && (
        <div className='flex flex-col gap-10 mt-10'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold flex items-center gap-2'>
              <span>Tổng số bình luận:</span>
              <span className='flex items-center justify-center bg-primary text-white text-sm font-semibold rounded-full py-0.5 px-4'>
                {formatTotalComments(rootComments?.length || 0)}
              </span>
            </h2>
            <CommentSorting />
          </div>
          <div className='flex flex-col gap-5'>
            {rootComments?.map((item) => (
              <CommentField
                key={item._id}
                comment={item}
                lessonId={commentLessonId}
                userId={commentUserId}
                comments={comments || []}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default page
