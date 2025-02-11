'use server';

import User, { IUser } from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import { CreateUserParams } from '@/types';
import Course, { ICourse } from '@/database/course.model';
import { ECourseStatus } from '@/types/enums';
import Lecture from '@/database/lecture.model';
import Lesson from '@/database/lesson.model';

export async function createUser(params: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(params);
    return newUser;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserInfo({
  userId,
}: {
  userId: string;
}) {
  try {
    connectToDatabase();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return null;
    return findUser;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserCourses(userId: string): Promise<ICourse[] | undefined | null> {
  try {
    connectToDatabase();
    const findUser = await User.findOne({ clerkId: userId }).populate({
      path: "courses",
      model: Course,
      match: {
        status: ECourseStatus.APPROVED,
      },
      populate: {
        path: "lectures",
        model: Lecture,
        select: "lessons",
        populate: {
          path: "lessons",
          model: Lesson,
          select: "slug",
        },
      },
    });
    if (!findUser) return null;
    return findUser.courses;
  } catch (error) {
    console.log(error);
  }
}
