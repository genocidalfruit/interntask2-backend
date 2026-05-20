"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissions = exports.Permission = void 0;
exports.Permission = {
    ASSET_VIEW: "asset.view",
    ASSET_CREATE: "asset.create",
    ASSET_UPDATE: "asset.update",
    ASSET_ASSIGN: "asset.assign",
    ASSET_RETIRE: "asset.retire",
    TICKET_VIEW: "ticket.view",
    TICKET_CREATE: "ticket.create",
    TICKET_ASSIGN: "ticket.assign",
    TICKET_UPDATE: "ticket.update",
    TICKET_RESOLVE: "ticket.resolve",
    TICKET_CLOSE: "ticket.close",
    USER_VIEW: "user.view",
    USER_MANAGE: "user.manage",
    ROLE_MANAGE: "role.manage",
    DASHBOARD_VIEW: "dashboard.view",
    REPORT_VIEW: "report.view",
    AUDIT_VIEW: "audit.view",
    NOTIFICATION_VIEW: "notification.view",
};
exports.RolePermissions = {
    Admin: Object.values(exports.Permission),
    Technician: [
        exports.Permission.DASHBOARD_VIEW,
        exports.Permission.ASSET_VIEW,
        exports.Permission.TICKET_VIEW,
        exports.Permission.TICKET_UPDATE,
        exports.Permission.TICKET_RESOLVE,
        exports.Permission.NOTIFICATION_VIEW,
    ],
    Employee: [
        exports.Permission.DASHBOARD_VIEW,
        exports.Permission.ASSET_VIEW,
        exports.Permission.TICKET_VIEW,
        exports.Permission.TICKET_CREATE,
        exports.Permission.NOTIFICATION_VIEW,
    ],
    Auditor: [
        exports.Permission.DASHBOARD_VIEW,
        exports.Permission.ASSET_VIEW,
        exports.Permission.TICKET_VIEW,
        exports.Permission.AUDIT_VIEW,
        exports.Permission.REPORT_VIEW,
    ],
};
//# sourceMappingURL=permissions.js.map