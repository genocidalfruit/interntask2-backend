import mongoose, { Schema, Document } from "mongoose";
import { UserStatus } from "@/shared/enums";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  roleId: mongoose.Types.ObjectId;
  status: UserStatus;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    status: { type: String, enum: Object.values(UserStatus), default: UserStatus.ACTIVE },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);