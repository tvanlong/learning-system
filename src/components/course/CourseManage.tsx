'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { commonClassNames, courseStatus } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import Heading from '@/components/common/Heading';
import {
  IconArrowLeft,
  IconArrowRight,
  IconDelete,
  IconEdit,
  IconEye,
  IconStudy,
} from '@/components/icons';
import { ICourse } from '@/database/course.model';
import { Input } from '@/components/ui/input';
import { ECourseStatus } from '@/types/enums';
import { formatCurrency } from '@/utils/currency';
import Swal from 'sweetalert2';
import { updateCourse } from '@/lib/actions/course.actions';
import { toast } from 'sonner';

const CourseManage = ({ courses }: { courses: ICourse[] }) => {
  const handleDeleteCourse = (slug: string) => {
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa khóa học này?',
      text: 'Bạn sẽ không thể khôi phục lại dữ liệu sau khi xóa!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateCourse({
          slug,
          updateData: {
            status: ECourseStatus.PENDING,
            _destroy: true,
          },
          path: '/manage/course',
        });
        toast.success('Xóa khóa học thành công');
      }
    });
  };

  const handleChangeStatus = async (slug: string, status: ECourseStatus) => {
    try {
      Swal.fire({
        title: 'Bạn chắc chắn muốn cập nhật trạng thái này?',
        text: 'Trạng thái sẽ được cập nhật ngay sau khi bạn xác nhận!',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse({
            slug,
            updateData: {
              status: ECourseStatus.PENDING
                ? ECourseStatus.APPROVED
                : ECourseStatus.PENDING,
              _destroy: false,
            },
            path: '/manage/course',
          });
          toast.success('Cập nhật trạng thái thành công!');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link
        href='/manage/course/new'
        className='size-10 rounded-full bg-primary flex justify-center items-center text-white fixed right-5 bottom-5 animate-bounce'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 4.5v15m7.5-7.5h-15'
          />
        </svg>
      </Link>
      <div className='flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10'>
        <Heading className=''>Quản lý khóa học</Heading>
        <div className='w-full lg:w-[300px]'>
          <Input placeholder='Tìm kiếm khóa học...' />
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
              const courseStatusItem = courseStatus.find(
                (item) => item.value === course.status
              );
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
                        <h3 className='font-bold text-sm lg:text-base whitespace-nowrap'>
                          {course.title}
                        </h3>
                        <h4 className='text-xs lg:text-sm text-slate-500'>
                          {new Date(course.created_at).toLocaleDateString(
                            'vi-VI'
                          )}
                        </h4>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className='font-bold text-sm lg:text-base'>
                      {formatCurrency(course.price)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      type='button'
                      className={cn(
                        commonClassNames.status,
                        courseStatusItem?.className
                      )}
                      onClick={() =>
                        handleChangeStatus(course.slug, course.status)
                      }
                    >
                      {courseStatusItem?.title}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className='flex gap-3'>
                      <Link
                        href={`/manage/course/update-content?slug=${course.slug}`}
                        className={commonClassNames.action}
                      >
                        <IconStudy />
                      </Link>
                      <Link
                        href={`/course/${course.slug}`}
                        target='_blank'
                        className={commonClassNames.action}
                      >
                        <IconEye />
                      </Link>
                      <Link
                        href={`/manage/course/update?slug=${course.slug}`}
                        className={commonClassNames.action}
                      >
                        <IconEdit />
                      </Link>
                      <button
                        onClick={() => handleDeleteCourse(course.slug)}
                        className={commonClassNames.action}
                      >
                        <IconDelete />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <div className='flex justify-end gap-3 mt-5'>
        <button className={commonClassNames.paginationButton}>
          <IconArrowLeft />
        </button>
        <button className={commonClassNames.paginationButton}>
          <IconArrowRight />
        </button>
      </div>
    </>
  );
};
export default CourseManage;
