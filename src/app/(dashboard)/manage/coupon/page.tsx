import type { Metadata } from 'next'

import { CouponManage } from '@/components/coupon/coupon-manage'
import { ITEMS_PER_PAGE } from '@/constants'
import { getCoupons } from '@/lib/actions/coupon.actions'

export const metadata: Metadata = {
  title: 'Quản lý mã giảm giá',
  description: 'Quản lý mã giảm giá',
  icons: '/logo.png'
}

interface IPageProps {
  searchParams: {
    page: number
    search: string
    active: boolean
  }
}

const page = async ({ searchParams }: IPageProps) => {
  const data = await getCoupons({
    page: searchParams.page || 1,
    limit: ITEMS_PER_PAGE,
    search: searchParams.search,
    active: searchParams.active
  })

  if (!data) return null
  const { coupons, total } = data
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  return <CouponManage coupons={coupons} totalPages={totalPages} total={total} />
}

export default page
