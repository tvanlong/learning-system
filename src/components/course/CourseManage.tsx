'use client'
import Image from 'next/image'
import { toast } from 'sonner'
import Swal from 'sweetalert2'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { allValue, courseStatus } from '@/constants'
import { ICourse } from '@/database/course.model'
import useQueryString from '@/hooks/useQueryString'
import { updateCourse } from '@/lib/actions/course.actions'
import { ECourseStatus } from '@/types/enums'

import { BouncedLink, StatusBadge, TableAction } from '../common'
import Heading from '../common/Heading'
import TableActionItem from '../common/TableActionItem'
import { Input } from '../ui/input'

interface ICourseManageProps {
  courses: ICourse[]
}

const CourseManage = ({ courses }: ICourseManageProps) => {
  const { handleSearchData, handleSelectStatus } = useQueryString()

  const handleDeleteCourse = (slug: string) => {
    Swal.fire({
      title: 'Bạn có chắc muốn xóa khóa học này không?',
      text: 'Không thể hoàn tác sau khi xóa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateCourse({
          slug,
          updateData: {
            status: ECourseStatus.PENDING,
            _destroy: true
          },
          path: '/manage/course'
        })
        toast.success('Xóa khóa học thành công!')
      }
    })
  }
  const handleChangeStatus = async (slug: string, status: ECourseStatus) => {
    try {
      Swal.fire({
        title: 'Bạn có chắc muốn đổi trạng thái không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Cập nhật',
        cancelButtonText: 'Hủy'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse({
            slug,
            updateData: {
              status: status === ECourseStatus.PENDING ? ECourseStatus.APPROVED : ECourseStatus.PENDING,
              _destroy: false
            },
            path: '/manage/course'
          })
          toast.success('Cập nhật trạng thái thành công!')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <BouncedLink url='/manage/course/new'></BouncedLink>
      <div className='flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10'>
        <Heading className=''>Quản lý khóa học</Heading>
        <div className='flex gap-3'>
          <div className='w-full lg:w-[300px]'>
            <Input placeholder='Tìm kiếm khóa học...' onChange={handleSearchData} />
          </div>
          <Select onValueChange={(value) => handleSelectStatus(value as ECourseStatus)}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Chọn trạng thái' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {courseStatus.map((status) => (
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
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length > 0 &&
            courses.map((course) => {
              const courseStatusItem = courseStatus.find((item) => item.value === course.status)
              return (
                <TableRow key={course.slug}>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Image
                        alt=''
                        src={course.image}
                        width={80}
                        height={80}
                        className='flex-shrink-0 size-16 rounded-lg object-cover'
                      />
                      <div className='flex flex-col gap-1'>
                        <h3 className='font-bold text-sm lg:text-base whitespace-nowrap'>{course.title}</h3>
                        <h4 className='text-xs lg:text-sm text-slate-500'>
                          {new Date(course.created_at).toLocaleDateString('vi-VI')}
                        </h4>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className='font-bold text-sm lg:text-base'>{course.price.toLocaleString()}đ</span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      item={courseStatusItem}
                      onClick={() => handleChangeStatus(course.slug, course.status)}
                    ></StatusBadge>
                  </TableCell>
                  <TableCell>
                    <TableAction>
                      <TableActionItem
                        type='study'
                        url={`/manage/course/update-content?slug=${course.slug}`}
                      ></TableActionItem>
                      <TableActionItem type='view' url={`/course/${course.slug}`}></TableActionItem>
                      <TableActionItem type='edit' url={`/manage/course/update?slug=${course.slug}`}></TableActionItem>
                      <TableActionItem type='delete' onClick={() => handleDeleteCourse(course.slug)}></TableActionItem>
                    </TableAction>
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
      {/* <div className="flex justify-end gap-3 mt-5">
        <button
          className={commonClassNames.paginationButton}
          onClick={() => handleChangePage("prev")}
        >
          <IconLeftArrow />
        </button>
        <button
          className={commonClassNames.paginationButton}
          onClick={() => handleChangePage("next")}
        >
          <IconRightArrow />
        </button>
      </div> */}
    </>
  )
}

export default CourseManage
