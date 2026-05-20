import mongoose, { Document } from "mongoose";
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
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
