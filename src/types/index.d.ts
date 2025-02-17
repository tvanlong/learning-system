import { ICourse } from '@/database/course.model'
import { ILesson } from '@/database/lesson.model'

// Common types
export type ActiveLinkProps = {
  url: string
  children: React.ReactNode
}

export type MenuItemProps = {
  url: string
  title: string
  icon?: React.ReactNode
  isProtected?: boolean
  onlyIcon?: boolean
}

// User types
export type CreateUserParams = {
  clerkId: string
  name?: string
  username: string
  email: string
  avatar?: string
}

// Course types
export type CreateCourseParams = {
  title: string
  slug: string
}

export type UpdateCourseParams = {
  slug: string
  updateData: Partial<ICourse>
  path?: string
}

export type TUpdateCourseLecture = {
  _id: string
  title: string
  lessons: ILesson[]
}

export interface ICourseUpdateParams extends Omit<ICourse, 'lectures'> {
  lectures: TUpdateCourseLecture[]
}

export type TGetAllCourseParams = {
  page?: number
  limit?: number
  search?: string
  status?: string
}

export interface IStudyCourses extends Omit<ICourse, 'lectures'> {
  lectures: {
    lessons: {
      slug: string
    }[]
  }[]
}

// Lecture types
export type TCreateLectureParams = {
  course: string
  title?: string
  order?: number
  path?: string
}

export type TUpdateLectureParams = {
  lectureId: string
  updateData: {
    title?: string
    order?: number
    _destroy?: boolean
    path?: string
  }
}

// Lesson types
export type TCreateLessonParams = {
  lecture: string
  course: string
  title?: string
  order?: number
  path?: string
  slug?: string
}

export type TUpdateLessonParams = {
  lessonId: string
  updateData: {
    title?: string
    slug?: string
    duration?: number
    video_url?: string
    content?: string
    _destroy?: boolean
  }
  path?: string
}

// History types
export type TCreateHistoryParams = {
  course: string
  lesson: string
  checked: boolean | string
  path: string
}

// Order types
export type TCreateOrderParams = {
  code: string
  course: string
  user: string
  total?: number
  amount?: number
  discount?: number
  coupon?: string
}

// Coupon
export type TCreateCouponParams = Omit<ICoupon, '_id created_at'>
export type TCouponParams = Omit<ICoupon, 'courses'> & {
  courses: {
    _id: string
    title: string
  }[]
}

export type TCreateCouponParams = {
  title: string
  code: string
  type: ECouponType
  value?: number
  start_date?: Date
  end_date?: Date
  active?: boolean
  limit?: number
  courses?: string[]
}

export type TUpdateCouponParams = {
  _id: string
  updateData: Partial<TCreateCouponParams>
}

export type TCouponItem = Omit<ICoupon, '_id' | 'courses'>

// Rating
export type TRatingIcon = 'awesome' | 'good' | 'meh' | 'bad' | 'terrible'

export type TCreateRatingParams = {
  rate: number
  content: string
  user: string
  course: string
}

export type TRatingItem = {
  _id: string
  content: string
  rate: number
  created_at: string
  course: {
    title: string
    slug: string
  }
  user: {
    name: string
  }
  status: ERatingStatus
}

// Comment types
export interface ICommentItem extends Omit<IComment, 'user'> {
  user: {
    name: string
    avatar: string
  }
}

// Filter, pagination
export type TFilterData = {
  page?: number
  limit?: number
  search?: string
  status?: string
  active?: boolean
}
