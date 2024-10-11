'use server';

import User, { IUser } from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import { CreateUserParams } from '@/types';

export async function createUser(
  params: CreateUserParams
): Promise<CreateUserParams | undefined> {
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
}): Promise<IUser | null | undefined> {
  try {
    connectToDatabase();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return null;
    return findUser;
  } catch (error) {
    console.log(error);
  }
}
