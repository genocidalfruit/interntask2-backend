"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asset_controller_1 = require("./asset.controller");
const auth_middleware_1 = require("@/middleware/auth.middleware");
const permission_middleware_1 = require("@/middleware/permission.middleware");
const scope_middleware_1 = require("@/middleware/scope.middleware");
const permissions_1 = require("@/shared/enums/permissions");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.authMiddleware, (0, permission_middleware_1.requirePermission)(permissions_1.Permission.ASSET_VIEW), scope_middleware_1.scopeAssets, asset_controller_1.getAll);
router.post("/", auth_middleware_1.authMiddleware, (0, permission_middleware_1.requirePermission)(permissions_1.Permission.ASSET_CREATE), asset_controller_1.create);
router.get("/:id", auth_middleware_1.authMiddleware, (0, permission_middleware_1.requirePermission)(permissions_1.Permission.ASSET_VIEW), asset_controller_1.getById);
router.patch("/:id", auth_middleware_1.authMiddleware, (0, permission_middleware_1.requirePermission)(permissions_1.Permission.ASSET_UPDATE), asset_controller_1.update);
router.post("/:id/assign", auth_middleware_1.authMiddleware, (0, permission_middleware_1.requirePermission)(permissions_1.Permission.ASSET_ASSIGN), asset_controller_1.assign);
router.post("/:id/status", auth_middleware_1.authMiddleware, (0, permission_middleware_1.requirePermission)(permissions_1.Permission.ASSET_UPDATE), asset_controller_1.changeStatus);
router.get("/:id/history", auth_middleware_1.authMiddleware, (0, permission_middleware_1.requirePermission)(permissions_1.Permission.ASSET_VIEW), asset_controller_1.getHistory);
router.delete("/:id", auth_middleware_1.authMiddleware, (0, permission_middleware_1.requirePermission)(permissions_1.Permission.ASSET_UPDATE), asset_controller_1.remove);
exports.default = router;
//# sourceMappingURL=asset.routes.js.map