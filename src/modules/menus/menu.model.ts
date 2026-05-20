import mongoose, { Schema, Document } from "mongoose";

export interface IMenu extends Document {
  label: string;
  icon: string;
  path: string;
  permissions: string[];
  parentId?: mongoose.Types.ObjectId;
  order: number;
}

const MenuSchema = new Schema<IMenu>({
  label: { type: String, required: true },
  icon: { type: String, required: true },
  path: { type: String, required: true },
  permissions: { type: [String], default: [] },
  parentId: { type: Schema.Types.ObjectId, ref: "Menu" },
  order: { type: Number, default: 0 },
});

export const Menu = mongoose.model<IMenu>("Menu", MenuSchema);