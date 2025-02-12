'use client'

import { useState } from 'react'

import { IconPlay, IconStudy, IconUsers } from '@/components/icons'
import { formatCurrency } from '@/utils/currency'

import ButtonEnroll from './ButtonEnroll'
import CouponForm from './CouponForm'

const CourseWidget = ({
  data,
  findUser,
  totalLesson,
  duration
}: {
  data: any
  findUser: any
  totalLesson: any
  duration: string
}) => {
  const [price, setPrice] = useState<number>(data.price)
  const [coupon, setCoupon] = useState('')

  return (
    <div className='bg-white rounded-lg p-5 border borderDarkMode lg:sticky lg:right-0 lg:top-20'>
      {price > 0 && (
        <div className='flex items-center gap-2 mb-3'>
          <strong className='text-primary text-xl font-bold'>{formatCurrency(price)}</strong>
          <span className='text-slate-400 line-through text-sm'>{formatCurrency(data.sale_price)}</span>
          <span className='ml-auto inline-block px-3 py-1 rounded-lg bg-primary text-primary bg-opacity-10 font-semibold text-sm'>
            {Math.floor((data.price / data.sale_price) * 100)}%
          </span>
        </div>
      )}
      <h3 className='font-bold mb-3 text-sm'>Khóa học gồm có:</h3>
      <ul className='mb-5 flex flex-col gap-2 text-sm text-slate-500'>
        <li className='flex items-center gap-2'>
          <IconPlay className='size-4' />
          <span>
            {totalLesson} bài học (khoảng {duration})
          </span>
        </li>
        <li className='flex items-center gap-2'>
          <IconPlay className='size-4' />
          <span>Video Full HD</span>
        </li>
        <li className='flex items-center gap-2'>
          <IconUsers className='size-4' />
          <span>Có nhóm hỗ trợ</span>
        </li>
        <li className='flex items-center gap-2'>
          <IconStudy className='size-4' />
          <span>Tài liệu kèm theo</span>
        </li>
      </ul>
      <ButtonEnroll
        user={findUser ? JSON.parse(JSON.stringify(findUser)) : null}
        courseId={data ? JSON.parse(JSON.stringify(data._id)) : null}
        amount={price}
        coupon={coupon}
      />
      {data.price > 0 && (
        <CouponForm
          setCouponId={setCoupon}
          originalPrice={data.price}
          setPrice={setPrice}
          courseId={data ? JSON.parse(JSON.stringify(data._id)) : null}
        />
      )}
    </div>
  )
}

export default CourseWidget
