'use server';

import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import { CreateUserParams } from '@/types';

export default async function createUser(
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
