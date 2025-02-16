import { Heading } from '@/components/common/heading'
import { NewCouponForm } from '@/components/coupon/new-coupon-form'

const page = () => {
  return (
    <div>
      <Heading className='mb-10'>Tạo mới mã giảm giá</Heading>
      <NewCouponForm></NewCouponForm>
    </div>
  )
}

export default page
