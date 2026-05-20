import mongoose, { Schema, Document } from "mongoose";
import { NotificationType } from "@/shared/enums";

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  type: NotificationType;
  message: string;
  read: boolean;
  entityId?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: Object.values(NotificationType), required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  entityId: { type: Schema.Types.ObjectId },
  createdAt: { type: Date, default: Date.now },
});

NotificationSchema.index({ userId: 1, read: 1, createdAt: -1 });

export const Notification = mongoose.model<INotification>("Notification", NotificationSchema);