"use server";

import Rating from "@/database/rating.model";
import { connectToDatabase } from "../mongoose";
import { TCreateRatingParams } from "@/types";
import Course from "@/database/course.model";
import { ERatingStatus } from "@/types/enums";
import { revalidatePath } from "next/cache";

export async function createRating(
  params: TCreateRatingParams
): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    const newRating = await Rating.create(params);
    const findCourse = await Course.findOne({ _id: params.course }).populate({
      path: "rating",
      model: Rating,
    });
    if (findCourse.rating) {
      await findCourse.rating.push(newRating._id);
      await findCourse.save();
    }
    if (!newRating) return false;
    return true;
  } catch (error) {
    console.log(error);
  }
}

export async function getRatingByUserId(
  userId: string
): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    const findRating = await Rating.findOne({ user: userId });
    return findRating?._id ? true : false;
  } catch (error) {
    console.log(error);
  }
}

export async function updateRating(id: string): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    await Rating.findByIdAndUpdate(id, { status: ERatingStatus.ACTIVE });
    revalidatePath("/admin/manage/rating");
    return true;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteRating(id: string): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    await Rating.findByIdAndDelete(id);
    revalidatePath("/admin/manage/rating");
    return true;
  } catch (error) {
    console.log(error);
  }
}