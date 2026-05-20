"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = require("./notification.controller");
const auth_middleware_1 = require("@/middleware/auth.middleware");
const permission_middleware_1 = require("@/middleware/permission.middleware");
const permissions_1 = require("@/shared/enums/permissions");
const router = (0, express_1.Router)();
router.get("/me", auth_middleware_1.authMiddleware, (0, permission_middleware_1.requirePermission)(permissions_1.Permission.NOTIFICATION_VIEW), notification_controller_1.getMyNotifications);
router.patch("/:id/read", auth_middleware_1.authMiddleware, (0, permission_middleware_1.requirePermission)(permissions_1.Permission.NOTIFICATION_VIEW), notification_controller_1.markRead);
exports.default = router;
//# sourceMappingURL=notification.routes.js.map