import mongoose, { Document } from "mongoose";
export interface IMenu extends Document {
    label: string;
    icon: string;
    path: string;
    permissions: string[];
    parentId?: mongoose.Types.ObjectId;
    order: number;
}
export declare const Menu: mongoose.Model<IMenu, {}, {}, {}, mongoose.Document<unknown, {}, IMenu, {}, mongoose.DefaultSchemaOptions> & IMenu & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IMenu>;
