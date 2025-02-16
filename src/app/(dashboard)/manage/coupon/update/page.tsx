import { Heading } from '@/components/common/heading'
import { UpdateCouponForm } from '@/components/coupon/update-coupon-form'
import { getCouponByCode } from '@/lib/actions/coupon.actions'

interface IPageProps {
  searchParams: {
    code: string
  }
}

const page = async ({ searchParams }: IPageProps) => {
  const couponDetails = await getCouponByCode({ code: searchParams.code })
  if (!couponDetails) return null
  return (
    <div>
      <Heading className='mb-10'>Cập nhật mã giảm giá</Heading>
      <UpdateCouponForm data={couponDetails}></UpdateCouponForm>
    </div>
  )
}

export default page
