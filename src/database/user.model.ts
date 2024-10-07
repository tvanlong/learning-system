import { EUserRole, EUserStatus } from '@/types/enums';
import { Document, model, models, Schema } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email_address: string;
  courses: Schema.Types.ObjectId[];
  avatar: string;
  status: EUserStatus;
  role: EUserRole;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  clerkId: { type: String },
  name: { type: String },
  username: { type: String, unique: true, required: true },
  email_address: { type: String, unique: true, required: true },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  avatar: { type: String },
  status: {
    type: String,
    enum: Object.values(EUserStatus),
    default: EUserStatus.ACTIVE,
  },
  role: {
    type: String,
    enum: Object.values(EUserRole),
    default: EUserRole.USER,
  },
  createdAt: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>('User', userSchema);

export default User;
