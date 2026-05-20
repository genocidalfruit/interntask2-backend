"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("@/modules/auth/auth.routes"));
const asset_routes_1 = __importDefault(require("@/modules/assets/asset.routes"));
const ticket_routes_1 = __importDefault(require("@/modules/tickets/ticket.routes"));
const user_routes_1 = __importDefault(require("@/modules/users/user.routes"));
const role_routes_1 = __importDefault(require("@/modules/roles/role.routes"));
const menu_routes_1 = __importDefault(require("@/modules/menus/menu.routes"));
const audit_routes_1 = __importDefault(require("@/modules/audit/audit.routes"));
const notification_routes_1 = __importDefault(require("@/modules/notifications/notification.routes"));
const router = (0, express_1.Router)();
router.use("/auth", auth_routes_1.default);
router.use("/assets", asset_routes_1.default);
router.use("/tickets", ticket_routes_1.default);
router.use("/users", user_routes_1.default);
router.use("/roles", role_routes_1.default);
router.use("/menus", menu_routes_1.default);
router.use("/audit-logs", audit_routes_1.default);
router.use("/notifications", notification_routes_1.default);
router.get("/health", (_req, res) => {
    res.json({ success: true, message: "OK", data: { status: "healthy", timestamp: new Date().toISOString() } });
});
exports.default = router;
//# sourceMappingURL=index.js.map