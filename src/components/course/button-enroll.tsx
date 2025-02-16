'use client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { IUser } from '@/database/user.model'
import { createOrder, updateOrder } from '@/lib/actions/order.actions'
import { EOrderStatus } from '@/types/enums'
import { createOrderCode } from '@/utils'

interface IButtonEnrollProps {
  user: IUser | null | undefined
  courseId: string
  amount: number
  coupon: string
}

export const ButtonEnroll = ({ user, courseId, amount, coupon }: IButtonEnrollProps) => {
  const router = useRouter()
  const handleEnrollCourse = async () => {
    if (!user?.name) {
      toast.error('Vui lòng đăng nhập để mua khóa học')
      return
    }
    const newOrder = await createOrder({
      code: createOrderCode(),
      user: user._id as string,
      course: courseId,
      total: amount,
      amount: amount,
      coupon
    })
    if (amount === 0) {
      await updateOrder({ orderId: newOrder._id, status: EOrderStatus.COMPLETED })
    } else {
      router.push(`/dashboard/order/${newOrder._id}`)
    }
  }
  return (
    <Button variant='primary' className='w-full' onClick={handleEnrollCourse}>
      Mua khóa học {amount === 0 && '(miễn phí)'}
    </Button>
  )
}
