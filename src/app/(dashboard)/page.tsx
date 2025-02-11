import { CourseGrid } from '@/components/common';
import Heading from '@/components/common/Heading';
import CourseItem from '@/components/course/CourseItem';
import { getAllCoursesPublic } from '@/lib/actions/course.actions';

const page = async () => {
  const courses = (await getAllCoursesPublic({})) || [];

  return (
    <>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {courses.length > 0 &&
          courses.map((course) => (
            <CourseItem key={course.slug} data={course} />
          ))}
      </CourseGrid>
    </>
  );
};

export default page;
