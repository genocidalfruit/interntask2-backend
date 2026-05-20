import { Notification } from "./notification.model";
import { NotificationType } from "@/shared/enums";
import mongoose from "mongoose";

export class NotificationService {
  async create(userId: string, type: NotificationType, message: string, entityId?: string) {
    return Notification.create({
      userId: new mongoose.Types.ObjectId(userId),
      type,
      message,
      entityId: entityId ? new mongoose.Types.ObjectId(entityId) : undefined,
    });
  }

  async getMyNotifications(userId: string, read?: boolean) {
    const filter: Record<string, unknown> = { userId };
    if (read !== undefined) filter.read = read;

    return Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(50);
  }

  async markRead(id: string, userId: string) {
    const notification = await Notification.findOneAndUpdate(
      { _id: id, userId },
      { read: true },
      { new: true }
    );
    if (!notification) throw new Error("Notification not found");
    return notification;
  }

  async getUnreadCount(userId: string) {
    return Notification.countDocuments({ userId, read: false });
  }
}

export const notificationService = new NotificationService();