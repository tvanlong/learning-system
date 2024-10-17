import { getCourseBySlug } from '@/lib/actions/course.actions';
import { findAllLessons, getLessonBySlug } from '@/lib/actions/lession.actions';
import LessonNavigation from './LessonNavigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TUpdateCourseLecture } from '@/types';
import LessonItem from '@/components/lesson/LessonItem';

const page = async ({
  params,
  searchParams,
}: {
  params: {
    course: string;
  };
  searchParams: {
    slug: string;
  };
}) => {
  const course = params.course;
  const slug = searchParams.slug;
  const findCourse = await getCourseBySlug({ slug: course });
  const courseId = findCourse?._id.toString();
  if (!findCourse) return null;
  const lessonDetails = await getLessonBySlug({
    slug,
    course: courseId || '',
  });

  if (!lessonDetails) return null;
  const lessonList = await findAllLessons({ course: courseId || '' });
  const currentLessonIndex =
    lessonList?.findIndex((el) => el.slug === lessonDetails.slug) || 0;
  const nextLesson = lessonList?.[currentLessonIndex + 1];
  const prevLesson = lessonList?.[currentLessonIndex - 1];
  const videoId = lessonDetails.video_url?.split('v=').at(-1);
  const lectures = findCourse.lectures || [];

  return (
    <div className='grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen'>
      <div>
        <div className='relative mb-5 aspect-video'>
          <iframe
            className='w-full h-full object-fill rounded-lg'
            src={`https://www.youtube.com/embed/${videoId}`}
          ></iframe>
        </div>
        <div className='flex items-center justify-between'>
          <LessonNavigation
            nextLesson={
              !nextLesson ? '' : `/${course}/lesson?slug=${nextLesson?.slug}`
            }
            prevLesson={
              !prevLesson ? '' : `/${course}/lesson?slug=${prevLesson?.slug}`
            }
          ></LessonNavigation>
          <div></div>
        </div>
      </div>
      <div>
        <div className='flex flex-col gap-5'>
          {lectures.map((lecture: TUpdateCourseLecture) => (
            <Accordion
              type='single'
              collapsible
              className='w-full'
              key={lecture._id}
            >
              <AccordionItem value={lecture._id.toString()}>
                <AccordionTrigger>
                  <div className='flex items-center gap-3 justify-between w-full pr-5'>
                    <div className='text-sm'>{lecture.title}</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className='bg-white p-0'>
                  <div className='flex flex-col gap-3 mt-2 p-4'>
                    {lecture.lessons.map((lesson) => (
                      <LessonItem
                        key={lesson._id}
                        lesson={lesson}
                        url={`/${course}/lesson?slug=${lesson.slug}`}
                        isActive={lessonDetails.slug === lesson.slug}
                      ></LessonItem>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
