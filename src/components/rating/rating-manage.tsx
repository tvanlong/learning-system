'use client'
import Image from 'next/image'
import Link from 'next/link'
import Swal from 'sweetalert2'

import { Heading } from '@/components/common/heading'
import { PaginationBtn } from '@/components/common/pagination-btn'
import { StatusBadge } from '@/components/common/status-badge'
import { TableAction } from '@/components/common/table-action'
import { TableActionItem } from '@/components/common/table-action-item'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { allValue, ratingList, ratingStatus } from '@/constants'
import useQueryString from '@/hooks/useQueryString'
import { deleteRating, updateRating } from '@/lib/actions/rating.actions'
import { TRatingItem } from '@/types'
import { ERatingStatus } from '@/types/enums'

interface IRatingManageProps {
  ratings: any
}

export const RatingManage = ({ ratings }: IRatingManageProps) => {
  const { handleSearchData, handleSelectStatus } = useQueryString()

  const handleUpdateRating = async (id: string) => {
    try {
      await updateRating(id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteRating = async (id: string) => {
    try {
      Swal.fire({
        title: 'Bạn có chắc muốn xóa đánh giá này không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteRating(id)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className='flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10'>
        <Heading className=''>Quản lý đánh giá</Heading>
        <div className='flex gap-3'>
          <div className='w-full lg:w-[300px]'>
            <Input placeholder='Tìm kiếm đánh giá...' onChange={handleSearchData} />
          </div>
          <Select onValueChange={(value) => handleSelectStatus(value as ERatingStatus)} defaultValue={allValue}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Chọn trạng thái' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {ratingStatus.map((status) => (
                  <SelectItem value={status.value} key={status.value}>
                    {status.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className='table-responsive'>
        <TableHeader>
          <TableRow>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Khóa học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ratings.length > 0 &&
            ratings.map((rating: TRatingItem) => {
              const ratingItemStatus = ratingStatus.find((item) => item.value === rating.status)
              const icon = ratingList.find((item) => item.value === rating.rate)?.title
              return (
                <TableRow key={rating.rate}>
                  <TableCell>
                    <div className='flex flex-col gap-1'>
                      <div className='flex items-center gap-2'>
                        <strong>{rating.content}</strong>
                        <Image width={20} height={20} alt='' src={`/icons/${icon}.png`} />
                      </div>
                      <time>{new Date(rating.created_at).toLocaleDateString('vi-Vi')}</time>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/course/${rating.course.slug}`}
                      className='font-semibold hover:text-primary'
                      target='_blank'
                    >
                      {rating.course.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <strong>{rating.user?.name}</strong>
                  </TableCell>
                  <TableCell>
                    <StatusBadge item={ratingItemStatus} />
                  </TableCell>
                  <TableCell>
                    <TableAction>
                      {rating.status !== ERatingStatus.ACTIVE && (
                        <TableActionItem type='approve' onClick={() => handleUpdateRating(rating._id)} />
                      )}
                      <TableActionItem type='delete' onClick={() => handleDeleteRating(rating._id)} />
                    </TableAction>
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
      <PaginationBtn />
    </div>
  )
}
