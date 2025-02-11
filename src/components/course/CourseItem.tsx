import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IconClock, IconEye, IconStar } from '@/components/icons';
import { commonClassNames } from '@/constants';
import { IStudyCourses } from '@/types';
import { getCourseLessonsInfo } from '@/lib/actions/course.actions';
import { formatMinutesToHour, formatNumberToK } from '@/utils';

const CourseItem = async ({
  data,
  cta,
  url = '',
}: {
  data: IStudyCourses;
  cta?: string;
  url?: string;
}) => {
  const { duration }: any = (await getCourseLessonsInfo({ slug: data.slug })) || 0;
  const courseInfo = [
    {
      title: formatNumberToK(data.views),
      icon: (className?: string) => <IconEye className={className} />,
    },
    {
      title: data.rating,
      icon: (className?: string) => <IconStar className={className} />,
    },
    {
      title: formatMinutesToHour(duration),
      icon: (className?: string) => <IconClock className={className} />,
    },
  ];

  const courseUrl = url ? url : `/course/${data.slug}`;

  return (
    <div className='bgDarkMode border borderDarkMode p-4 rounded-2xl dark:bg-grayDarker dark:border-opacity-10 flex flex-col'>
      <Link href={courseUrl} className='block h-[180px] relative'>
        <Image
          src={data.image}
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
      <div className='pt-4 flex flex-col flex-1'>
        <h3 className='font-bold text-lg mb-5'>{data.title}</h3>
        <div className='mt-auto'>
          <div className='flex items-center gap-3 mb-5 text-xs text-gray-500 dark:text-grayDark'>
            {courseInfo.map((item, index) => (
              <div className='flex items-center gap-2' key={index}>
                {item.icon('size-4')}
                <span>{item.title}</span>
              </div>
            ))}
            <span className='font-bold text-primary ml-auto text-base'>
              {data.price > 0 ? data.price.toLocaleString() : 'Miễn phí'}
            </span>
          </div>
          <Link href={courseUrl} className={commonClassNames.btnPrimary}>
            {cta || 'Xem chi tiết'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
