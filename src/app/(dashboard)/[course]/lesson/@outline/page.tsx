import LessonContent from '@/components/lesson/LessonContent';
import { getCourseBySlug } from '@/lib/actions/course.actions';
import { getHistory } from '@/lib/actions/history.actions';
import { countLessonByCourseId } from '@/lib/actions/lession.actions';

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
  if (!findCourse) return null;
  const courseId = findCourse?._id.toString();
  const lectures = findCourse.lectures || [];
  const lessonCount = await countLessonByCourseId({ courseId: courseId || '' });
  const histories = await getHistory({ course: courseId || '' });
  const completePercentage =
    ((histories?.length || 0) / (lessonCount || 1)) * 100;

  return (
    <div className='sticky top-5 lg:top-20 right-0 max-h-[calc(100svh-100px)] overflow-y-auto'>
      <div className='flex gap-5 justify-between items-center mb-5'>
        <span className='text-sm font-semibold text-gray-400'>
          Tiến độ học tập: {histories?.length || 0}/{lessonCount || 1}
        </span>
        <div className='h-3 flex-1 w-full rounded-full border borderDarkMode bgDarkMode'>
          <div
            className='h-full rounded-full bg-primary w-0 transition-all duration-300'
            style={{
              width: `${completePercentage}%`,
            }}
          ></div>
        </div>
      </div>
      <LessonContent
        lectures={lectures}
        course={course}
        slug={slug}
        histories={histories ? JSON.parse(JSON.stringify(histories)) : []}
      ></LessonContent>
    </div>
  );
};

export default page;
