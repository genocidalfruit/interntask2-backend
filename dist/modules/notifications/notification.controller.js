"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyNotifications = getMyNotifications;
exports.markRead = markRead;
const notification_service_1 = require("./notification.service");
const response_1 = require("@/shared/response");
async function getMyNotifications(req, res) {
    try {
        const readParam = req.query.read;
        const read = readParam === "true" ? true : readParam === "false" ? false : undefined;
        const notifications = await notification_service_1.notificationService.getMyNotifications(req.user.id, read);
        res.json((0, response_1.success)("Notifications retrieved", notifications));
    }
    catch (err) {
        res.status(500).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function markRead(req, res) {
    try {
        const notification = await notification_service_1.notificationService.markRead(req.params.id, req.user.id);
        res.json((0, response_1.success)("Notification marked as read", notification));
    }
    catch (err) {
        res.status(404).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
//# sourceMappingURL=notification.controller.js.map