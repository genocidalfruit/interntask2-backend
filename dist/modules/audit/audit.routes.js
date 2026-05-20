"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const audit_controller_1 = require("./audit.controller");
const auth_middleware_1 = require("@/middleware/auth.middleware");
const permission_middleware_1 = require("@/middleware/permission.middleware");
const permissions_1 = require("@/shared/enums/permissions");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.authMiddleware, (0, permission_middleware_1.requirePermission)(permissions_1.Permission.AUDIT_VIEW), audit_controller_1.getAll);
exports.default = router;
//# sourceMappingURL=audit.routes.js.map