import { IconComment } from '@/components/icons/icon-comment'
import { IconCoupon } from '@/components/icons/icon-coupon'
import { IconExplore } from '@/components/icons/icon-explore'
import { IconOrder } from '@/components/icons/icon-order'
import { IconPlay } from '@/components/icons/icon-play'
import { IconStar } from '@/components/icons/icon-star'
import { IconStudy } from '@/components/icons/icon-study'
import { IconUsers } from '@/components/icons/icon-users'
import { MenuItemProps, TRatingIcon } from '@/types'
import { ECouponType, ECourseLevel, ECourseStatus, EOrderStatus, ERatingStatus } from '@/types/enums'

export const menuItems: MenuItemProps[] = [
  {
    url: '/',
    title: 'Trang chủ',
    icon: <IconPlay className='size-5' />
  },
  {
    url: '/study',
    title: 'Khóa học đã mua',
    icon: <IconStudy className='size-5' />
  },
  {
    url: '/manage/course',
    title: 'Quản lý khóa học',
    icon: <IconExplore className='size-5' />
  },
  {
    url: '/manage/member',
    title: 'Quản lý học viên',
    icon: <IconUsers className='size-5' />
  },
  {
    url: '/manage/comment',
    title: 'Quản lý bình luận',
    icon: <IconComment className='size-5' />
  },
  {
    url: '/manage/order',
    title: 'Quản lý đơn hàng',
    icon: <IconOrder className='size-5' />
  },
  {
    url: '/manage/rating',
    title: 'Quản lý đánh giá',
    icon: <IconStar className='size-5' />
  },
  {
    url: '/manage/coupon',
    title: 'Mã giảm giá',
    icon: <IconCoupon className='size-5' />
  }
]

export const courseStatus: {
  title: string
  value: ECourseStatus
  className?: string
}[] = [
  {
    title: 'Đã duyệt',
    value: ECourseStatus.APPROVED,
    className: 'text-green-500 bg-green-500'
  },
  {
    title: 'Chờ duyệt',
    value: ECourseStatus.PENDING,
    className: 'text-orange-500 bg-orange-500'
  },
  {
    title: 'Từ chối',
    value: ECourseStatus.REJECTED,
    className: 'text-red-500 bg-red-500'
  }
]

export const courseLevel: {
  title: string
  value: ECourseLevel
}[] = [
  {
    title: 'Dễ',
    value: ECourseLevel.BEGINNER
  },
  {
    title: 'Trung bình',
    value: ECourseLevel.INTERMEDIATE
  },
  {
    title: 'Khó',
    value: ECourseLevel.ADVANCED
  }
]

export const orderStatus: {
  title: string
  value: EOrderStatus
  className?: string
}[] = [
  {
    title: 'Đã duyệt',
    value: EOrderStatus.COMPLETED,
    className: 'text-green-500 bg-green-500'
  },
  {
    title: 'Chờ duyệt',
    value: EOrderStatus.PENDING,
    className: 'text-orange-500 bg-orange-500'
  },
  {
    title: 'Đã hủy',
    value: EOrderStatus.CANCELED,
    className: 'text-red-500 bg-red-500'
  }
]

export const courseLevelTitle: Record<ECourseLevel, string> = {
  [ECourseLevel.BEGINNER]: 'Dễ',
  [ECourseLevel.INTERMEDIATE]: 'Trung bình',
  [ECourseLevel.ADVANCED]: 'Khó'
}

export const commonClassNames = {
  status: 'bg-opacity-10 border border-current rounded-md font-medium px-3 py-1 text-xs',
  action:
    'size-8 rounded-md border flex items-center justify-center p-2  text-gray-500 hover:border-opacity-80 dark:bg-transparent borderDarkMode dark:hover:border-opacity-20',
  paginationButton:
    'size-10 rounded-md borderDarkMode bgDarkMode border flex items-center justify-center hover:border-primary transition-all hover:text-primary p-2.5',
  btnPrimary:
    'flex items-center justify-center w-full mt-10 rounded-lg text-white font-semibold bg-primary h-12 button-primary'
}

export const editorOptions = (field: any, theme: any) => ({
  initialValue: '',
  onBlur: field.onBlur,
  onEditorChange: (content: any) => field.onChange(content),
  init: {
    codesample_global_prismjs: true,
    skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
    height: 300,
    menubar: false,
    plugins: [
      'advlist',
      'autolink',
      'lists',
      'link',
      'image',
      'charmap',
      'preview',
      'anchor',
      'searchreplace',
      'visualblocks',
      'codesample',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'heading'
    ],
    toolbar:
      'undo redo | ' +
      'codesample | bold italic forecolor | alignleft aligncenter |' +
      'alignright alignjustify | bullist numlist |' +
      'image |' +
      'h1 h2 h3 h4 h5 h6 | preview | fullscreen |' +
      'link',
    content_style: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');body { font-family: Manrope,Helvetica,Arial,sans-serif; font-size:14px; line-height: 2; padding-bottom: 32px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; };`
  }
})

export const couponTypes: {
  title: string
  value: ECouponType
}[] = [
  {
    title: 'Phần trăm',
    value: ECouponType.PERCENT
  },
  {
    title: 'Giá trị',
    value: ECouponType.AMOUNT
  }
]

export const lastLessonKey = 'lastLesson'

export const ratingList: {
  title: TRatingIcon
  value: number
}[] = [
  {
    title: 'awesome',
    value: 5
  },
  {
    title: 'good',
    value: 4
  },
  {
    title: 'meh',
    value: 3
  },
  {
    title: 'bad',
    value: 2
  },
  {
    title: 'terrible',
    value: 1
  }
]

export const ratingStatus: {
  title: string
  value: ERatingStatus
  className?: string
}[] = [
  {
    title: 'Đã duyệt',
    value: ERatingStatus.ACTIVE,
    className: 'text-green-500 bg-green-500'
  },
  {
    title: 'Chờ duyệt',
    value: ERatingStatus.UNACTIVE,
    className: 'text-orange-500 bg-orange-500'
  }
]

export const allValue = 'ALL'

export const ITEMS_PER_PAGE = 10

export const couponStatuses = [
  {
    title: 'Đang kích hoạt',
    value: 1
  },
  {
    title: 'Chưa kích hoạt',
    value: 0
  }
]

export const MAX_COMMENT_LEVEL = 3

export const COMMENT_SPACING = 55
