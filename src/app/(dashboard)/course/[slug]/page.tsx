import PageNotFound from '@/app/not-found';
import {
  IconEye,
  IconLevel,
  IconPlay,
  IconStudy,
  IconTime,
  IconUsers,
} from '@/components/icons';
import LessonContent from '@/components/lesson/LessonContent';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { courseLevelTitle } from '@/constants';
import { getCourseBySlug } from '@/lib/actions/course.actions';
import { ECourseStatus } from '@/types/enums';
import { formatCurrency } from '@/utils/currency';
import Image from 'next/image';

const page = async ({ params }: { params: { slug: string } }) => {
  const data = await getCourseBySlug({ slug: params.slug });
  if (!data) return null;
  if (data.status !== ECourseStatus.APPROVED) return <PageNotFound />;
  const videoId = data.intro_url?.split('v=')[1];
  const lectures = data.lectures || [];
  const totalLesson = lectures.reduce((acc, cur) => {
    return acc + cur.lessons.length;
  }, 0);

  return (
    <div className='grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen'>
      <div>
        <div className='relative aspect-video mb-5'>
          {data.intro_url ? (
            <>
              <iframe
                width='853'
                height='480'
                src={`https://www.youtube.com/embed/${videoId}`}
                title='BLACK MYTH WUKONG New Insane Combat Preview and Gameplay Demo | EXCLUSIVE PS5 and PC Launch'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                className='w-full h-full object-fill rounded-lg'
              ></iframe>
            </>
          ) : (
            <Image
              src={data.image}
              alt=''
              fill
              className='w-full h-full object-cover rounded-lg'
            />
          )}
        </div>
        <h1 className='font-bold text-3xl my-8'>{data?.title}</h1>
        <BoxSection title='Mô tả'>
          <p className='leading-relaxed text-justify'>{data.desc}</p>
        </BoxSection>
        <BoxSection title='Thông tin'>
          <div className='grid grid-cols-4 gap-5 mb-10'>
            <BoxInfo title='Bài học' icon={<IconPlay className='size-5' />}>
              {totalLesson}
            </BoxInfo>
            <BoxInfo title='Lượt xem' icon={<IconEye className='size-5' />}>
              {data.views.toLocaleString()}
            </BoxInfo>
            <BoxInfo title='Trình độ' icon={<IconLevel className='size-5' />}>
              {courseLevelTitle[data.level]}
            </BoxInfo>
            <BoxInfo title='Thời lượng' icon={<IconTime className='size-5' />}>
              30h25p
            </BoxInfo>
          </div>
        </BoxSection>
        <BoxSection title='Nội dung khóa học'>
          <LessonContent lectures={lectures} course='' slug='' />
        </BoxSection>
        <BoxSection title='Yêu cầu'>
          {data.info.requirements.map((r, index) => (
            <div key={index} className='mb-3 flex items-center gap-2'>
              <span className='flex-shrink-0 size-5 bg-primary rounded-full text-white p-1 flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4.5 12.75l6 6 9-13.5'
                  />
                </svg>
              </span>
              <span>{r}</span>
            </div>
          ))}
        </BoxSection>
        <BoxSection title='Lợi ích'>
          {data.info.requirements.map((r, index) => (
            <div key={index} className='mb-3 flex items-center gap-2'>
              <span className='flex-shrink-0 size-5 bg-primary rounded-full text-white p-1 flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4.5 12.75l6 6 9-13.5'
                  />
                </svg>
              </span>
              <span>{r}</span>
            </div>
          ))}
        </BoxSection>
        <BoxSection title='Q.A'>
          {data.info.qa.map((qa, index) => (
            <Accordion type='single' collapsible key={index}>
              <AccordionItem value={qa.question}>
                <AccordionTrigger>{qa.question}</AccordionTrigger>
                <AccordionContent>{qa.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </BoxSection>
      </div>
      <div>
        <div className='bg-white rounded-lg p-5 border borderDarkMode'>
          <div className='flex items-center gap-2 mb-3'>
            <strong className='text-primary text-xl font-bold'>
              {formatCurrency(data.price)}
            </strong>
            <span className='text-slate-400 line-through text-sm'>
              {formatCurrency(data.sale_price)}
            </span>
            <span className='ml-auto inline-block px-3 py-1 rounded-lg bg-primary text-primary bg-opacity-10 font-semibold text-sm'>
              {Math.floor((data.price / data.sale_price) * 100)}%
            </span>
          </div>
          <h3 className='font-bold mb-3 text-sm'>Khóa học gồm có:</h3>
          <ul className='mb-5 flex flex-col gap-2 text-sm text-slate-500'>
            <li className='flex items-center gap-2'>
              <IconPlay className='size-4' />
              <span>{totalLesson} bài học</span>
            </li>
            <li className='flex items-center gap-2'>
              <IconPlay className='size-4' />
              <span>Video Full HD</span>
            </li>
            <li className='flex items-center gap-2'>
              <IconUsers className='size-4' />
              <span>Có nhóm hỗ trợ</span>
            </li>
            <li className='flex items-center gap-2'>
              <IconStudy className='size-4' />
              <span>Tài liệu kèm theo</span>
            </li>
          </ul>
          <Button variant='primary' className='w-full'>
            Mua khóa học
          </Button>
        </div>
      </div>
    </div>
  );
};

function BoxInfo({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className='bgDarkMode rounded-lg p-5 border borderDarkMode'>
      <h4 className='text-sm font-normal mb-2'>{title}</h4>
      <div className='flex items-center gap-1'>
        {icon}
        <h3 className='text-sm font-medium'>{children}</h3>
      </div>
    </div>
  );
}

function BoxSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className='font-bold text-xl mb-5'>{title}</h2>
      <div className='mb-10'>{children}</div>
    </>
  );
}
export default page;
