import mongoose, { Document } from "mongoose";
export interface IRole extends Document {
    name: string;
    icon: string;
    permissions: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const Role: mongoose.Model<IRole, {}, {}, {}, mongoose.Document<unknown, {}, IRole, {}, mongoose.DefaultSchemaOptions> & IRole & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IRole>;
