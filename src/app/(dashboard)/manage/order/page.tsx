import type { Metadata } from 'next'

import { OrderManage } from '@/components/order/order-manage'
import { ITEMS_PER_PAGE } from '@/constants'
import { fetchOrders } from '@/lib/actions/order.actions'
import { EOrderStatus } from '@/types/enums'

export const metadata: Metadata = {
  title: 'Quản lý đơn hàng',
  description: 'Quản lý đơn hàng',
  icons: '/logo.png'
}

interface IPageProps {
  searchParams: {
    page: number
    search: string
    status: EOrderStatus
  }
}

const page = async ({ searchParams }: IPageProps) => {
  const data = await fetchOrders({
    page: searchParams.page || 1,
    limit: ITEMS_PER_PAGE,
    search: searchParams.search,
    status: searchParams.status
  })

  if (!data) return null
  const { orders, total } = data
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  return <OrderManage orders={orders} totalPages={totalPages} total={total} />
}

export default page
