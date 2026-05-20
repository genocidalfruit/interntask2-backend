import { NotificationType } from "@/shared/enums";
import mongoose from "mongoose";
export declare class NotificationService {
    create(userId: string, type: NotificationType, message: string, entityId?: string): Promise<mongoose.Document<unknown, {}, import("./notification.model").INotification, {}, mongoose.DefaultSchemaOptions> & import("./notification.model").INotification & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getMyNotifications(userId: string, read?: boolean): Promise<(mongoose.Document<unknown, {}, import("./notification.model").INotification, {}, mongoose.DefaultSchemaOptions> & import("./notification.model").INotification & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    markRead(id: string, userId: string): Promise<mongoose.Document<unknown, {}, import("./notification.model").INotification, {}, mongoose.DefaultSchemaOptions> & import("./notification.model").INotification & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getUnreadCount(userId: string): Promise<number>;
}
export declare const notificationService: NotificationService;
