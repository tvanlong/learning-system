import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IconClock, IconEye, IconStar } from '@/components/icons';

const courseInfo = [
  {
    title: '1000',
    icon: (className?: string) => <IconEye className={className} />,
  },
  {
    title: '5.0',
    icon: (className?: string) => <IconStar className={className} />,
  },
  {
    title: '30h25p',
    icon: (className?: string) => <IconClock className={className} />,
  },
];

const CourseItem = () => {
  return (
    <div className='bg-white border border-gray-100 p-4 rounded-2xl dark:bg-grayDarker dark:border-opacity-10'>
      <Link href='#' className='block h-[180px] relative'>
        <Image
          src='https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/040cdcf87e243d916a4718f2d4306a01?_a=AQAEuiZ'
          width={300}
          height={200}
          alt='course'
          className='w-full h-full object-cover rounded-lg'
          sizes='@media (min-width: 640px) 300px, 100vw'
          priority
        />
        <span className='inline-block px-3 py-1 rounded-full absolute top-3 right-3 z-10 text-white font-medium bg-green-500 text-xs'>
          New
        </span>
      </Link>
      <div className='pt-4'>
        <h3 className='font-bold text-lg mb-5'>
          Khóa học ReactJS Pro - Xây dựng website cơ bản vơi ReactJS
        </h3>
        <div className='flex items-center gap-3 mb-5 text-xs text-gray-500 dark:text-gray-100'>
          {courseInfo.map((item, index) => (
            <div key={index} className='flex items-center gap-2'>
              {item.icon('size-4')}
              <span>{item.title}</span>
            </div>
          ))}
          <span className='font-bold text-red-500 ml-auto text-base'>
            899.000 VNĐ
          </span>
        </div>
        <Link
          href='#'
          className='flex items-center justify-center w-full mt-10 rounded-lg text-white bg-primary font-sesmibold h-12'
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
