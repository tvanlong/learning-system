import { ICourse } from '@/database/course.model';

export type ActiveLinkProps = {
  url: string;
  children: React.ReactNode;
};

export type MenuItemProps = {
  url: string;
  title: string;
  icon?: React.ReactNode;
};

export type CreateUserParams = {
  clerkId: string;
  name?: string;
  username: string;
  email: string;
  avatar?: string;
};

export type CreateCourseParams = {
  title: string;
  slug: string;
};

export type UpdateCourseParams = {
  slug: string;
  updateData: Partial<ICourse>;
};
