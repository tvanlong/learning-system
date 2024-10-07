import { CourseGrid } from '@/components/common';
import CourseItem from '@/components/course/CourseItem';
import Heading from '@/components/typography/Heading';
import createUser from '@/lib/actions/user.actions';

const page = async () => {
  const user = await createUser({
    clerkId: 'clerkId_123',
    username: 'long',
    email_address: 'long@gmail.com',
  });

  return (
    <>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        <CourseItem />
        <CourseItem />
        <CourseItem />
      </CourseGrid>
    </>
  );
};

export default page;
