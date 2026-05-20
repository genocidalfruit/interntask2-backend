"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("@/middleware/auth.middleware");
const permission_middleware_1 = require("@/middleware/permission.middleware");
const permissions_1 = require("@/shared/enums/permissions");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.authMiddleware, (0, permission_middleware_1.requirePermission)(permissions_1.Permission.USER_VIEW), user_controller_1.getAll);
router.post("/", auth_middleware_1.authMiddleware, (0, permission_middleware_1.requirePermission)(permissions_1.Permission.USER_MANAGE), user_controller_1.create);
router.get("/:id", auth_middleware_1.authMiddleware, (0, permission_middleware_1.requirePermission)(permissions_1.Permission.USER_VIEW), user_controller_1.getById);
router.patch("/:id", auth_middleware_1.authMiddleware, (0, permission_middleware_1.requirePermission)(permissions_1.Permission.USER_MANAGE), user_controller_1.update);
router.delete("/:id", auth_middleware_1.authMiddleware, (0, permission_middleware_1.requirePermission)(permissions_1.Permission.USER_MANAGE), user_controller_1.remove);
exports.default = router;
//# sourceMappingURL=user.routes.js.map