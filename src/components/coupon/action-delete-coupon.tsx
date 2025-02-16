'use client'
import Swal from 'sweetalert2'

import { TableActionItem } from '@/components/common/table-action-item'
import { deleteCoupon } from '@/lib/actions/coupon.actions'

interface IActionDeleteCouponProps {
  code: string
}

export const ActionDeleteCoupon = ({ code }: IActionDeleteCouponProps) => {
  const handleDeleteCoupon = async (code: string) => {
    try {
      Swal.fire({
        title: 'Bạn có chắc muốn xóa coupon này không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteCoupon(code)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  return <TableActionItem type='delete' onClick={() => handleDeleteCoupon(code)}></TableActionItem>
}
