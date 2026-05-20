"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = exports.NotificationService = void 0;
const notification_model_1 = require("./notification.model");
const mongoose_1 = __importDefault(require("mongoose"));
class NotificationService {
    async create(userId, type, message, entityId) {
        return notification_model_1.Notification.create({
            userId: new mongoose_1.default.Types.ObjectId(userId),
            type,
            message,
            entityId: entityId ? new mongoose_1.default.Types.ObjectId(entityId) : undefined,
        });
    }
    async getMyNotifications(userId, read) {
        const filter = { userId };
        if (read !== undefined)
            filter.read = read;
        return notification_model_1.Notification.find(filter)
            .sort({ createdAt: -1 })
            .limit(50);
    }
    async markRead(id, userId) {
        const notification = await notification_model_1.Notification.findOneAndUpdate({ _id: id, userId }, { read: true }, { new: true });
        if (!notification)
            throw new Error("Notification not found");
        return notification;
    }
    async getUnreadCount(userId) {
        return notification_model_1.Notification.countDocuments({ userId, read: false });
    }
}
exports.NotificationService = NotificationService;
exports.notificationService = new NotificationService();
//# sourceMappingURL=notification.service.js.map