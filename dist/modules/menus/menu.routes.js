"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_controller_1 = require("./menu.controller");
const auth_middleware_1 = require("@/middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/me", auth_middleware_1.authMiddleware, menu_controller_1.getMyMenus);
router.get("/", auth_middleware_1.authMiddleware, menu_controller_1.getAll);
router.post("/", auth_middleware_1.authMiddleware, menu_controller_1.create);
router.patch("/:id", auth_middleware_1.authMiddleware, menu_controller_1.update);
exports.default = router;
//# sourceMappingURL=menu.routes.js.map