import type { Metadata } from 'next'

import { Heading } from '@/components/common/heading'
import { NewCouponForm } from '@/components/coupon/new-coupon-form'

export const metadata: Metadata = {
  title: 'Tạo mới mã giảm giá',
  description: 'Tạo mới mã giảm giá',
  icons: '/logo.png'
}

const page = () => {
  return (
    <div>
      <Heading className='mb-10'>Tạo mới mã giảm giá</Heading>
      <NewCouponForm></NewCouponForm>
    </div>
  )
}

export default page
