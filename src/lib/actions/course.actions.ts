'use server';

import { CreateCourseParams, UpdateCourseParams } from '@/types';
import { connectToDatabase } from '../mongoose';
import Course, { ICourse } from '@/database/course.model';
import { revalidatePath } from 'next/cache';

export async function getAllCourses(): Promise<ICourse[] | undefined> {
  try {
    connectToDatabase();
    const courses = await Course.find();
    return courses;
  } catch (error) {
    console.log(error);
  }
}

export async function getCourseBySlug({
  slug,
}: {
  slug: string;
}): Promise<ICourse | undefined> {
  try {
    connectToDatabase();
    const course = await Course.findOne({ slug });
    return course;
  } catch (error) {
    console.log(error);
  }
}

export async function createCourse(params: CreateCourseParams) {
  try {
    connectToDatabase();
    const existCourse = await Course.findOne({ slug: params.slug });
    if (existCourse) {
      return {
        success: false,
        message: 'Đường dẫn khóa học đã tồn tại!',
      };
    }
    const course = await Course.create(params);
    return {
      success: true,
      message: 'Tạo khóa học thành công',
      data: JSON.parse(JSON.stringify(course)),
    };
  } catch (error) {
    console.error(error);
  }
}

export async function updateCourse(params: UpdateCourseParams) {
  try {
    connectToDatabase();
    const findCourse = await Course.findOne({ slug: params.slug });
    if (!findCourse) return;
    await Course.findOneAndUpdate({ slug: params.slug }, params.updateData, {
      new: true,
    });
    revalidatePath(params.path || '/');
    return {
      success: true,
      message: 'Cập nhật khóa học thành công',
    };
  } catch (error) {
    console.error(error);
  }
}