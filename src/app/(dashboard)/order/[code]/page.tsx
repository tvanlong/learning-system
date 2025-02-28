import PageNotFound from '@/app/not-found'
import { getOrderDetails } from '@/lib/actions/order.actions'
import { formatCurrency } from '@/utils/currency'
interface IOrderDetailsProps {
  params: {
    code: string
  }
}

export async function generateMetadata({ params }: IOrderDetailsProps) {
  const data = await getOrderDetails({ code: params.code })
  if (!data) {
    return {
      title: 'Đơn hàng không tồn tại',
      description: 'Đơn hàng không tồn tại hoặc đã bị xóa',
      icons: '/logo.png'
    }
  }

  return {
    title: `Đơn hàng ${data.code}`,
    description: 'Thông tin chi tiết đơn hàng',
    icons: '/logo.png'
  }
}

const OrderDetails = async ({ params }: IOrderDetailsProps) => {
  const orderDetails = await getOrderDetails({ code: params.code })
  if (!orderDetails) return <PageNotFound />

  return (
    <div className='flex flex-col gap-5'>
      <p>
        Cám ơn bạn đã mua khóa học <strong className='text-primary'>{orderDetails.course.title}</strong> với số tiền là{' '}
        <strong className='text-primary'>{formatCurrency(orderDetails.total)}</strong>
      </p>
      <p>
        Bạn vui lòng thanh toán theo thông tin tài khoản dưới đây với nội dung{' '}
        <strong className='text-primary'>{orderDetails.code}</strong>
      </p>
    </div>
  )
}

export default OrderDetails
