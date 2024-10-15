import { ICourse } from '@/database/course.model';
import { ILecture } from '@/database/lecture.model';

export type ActiveLinkProps = {
  url: string;
  children: React.ReactNode;
};

export type MenuItemProps = {
  url: string;
  title: string;
  icon?: React.ReactNode;
  onlyIcon?: boolean;
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
  path?: string;
};

export interface ICourseUpdateParams extends Omit<ICourse, 'lectures'> {
  lectures: ILecture[];
}

export type TCreateLectureParams = {
  course: string;
  title?: string;
  order?: number;
  path?: string;
};

export type TUpdateLectureParams = {
  lectureId: string;
  updateData: {
    title?: string;
    order?: number;
    _destroy?: boolean;
    path?: string;
  };
};
