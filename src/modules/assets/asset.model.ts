import mongoose, { Schema, Document } from "mongoose";
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

const AssetSchema = new Schema<IAsset>(
  {
    assetCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: Object.values(AssetStatus), default: AssetStatus.AVAILABLE },
    purchaseDate: { type: Date, required: true },
    warrantyExpiry: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Asset = mongoose.model<IAsset>("Asset", AssetSchema);