import { CourseGrid } from '@/components/common';
import CourseItem from '@/components/course/CourseItem';
import Heading from '@/components/typography/Heading';
import { getAllCourses } from '@/lib/actions/course.actions';

const page = async () => {
  const courses = (await getAllCourses()) || [];

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
