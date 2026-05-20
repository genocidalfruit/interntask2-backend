import mongoose, { Document } from "mongoose";
import { AssetStatus } from "@/shared/enums";
export interface IAsset extends Document {
    assetCode: string;
    name: string;
    category: string;
    assignedTo?: mongoose.Types.ObjectId;
    status: AssetStatus;
    purchaseDate: Date;
    warrantyExpiry?: Date;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Asset: mongoose.Model<IAsset, {}, {}, {}, mongoose.Document<unknown, {}, IAsset, {}, mongoose.DefaultSchemaOptions> & IAsset & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IAsset>;
