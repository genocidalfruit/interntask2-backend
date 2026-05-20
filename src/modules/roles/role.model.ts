import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
  icon: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true },
    icon: { type: String, default: "Shield" },
    permissions: { type: [String], required: true },
  },
  { timestamps: true }
);

export const Role = mongoose.model<IRole>("Role", RoleSchema);