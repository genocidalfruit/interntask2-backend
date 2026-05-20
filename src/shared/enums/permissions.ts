export const Permission = {
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
  TICKET_ESCALATE: "ticket.escalate",
  TICKET_CLOSE: "ticket.close",
  USER_VIEW: "user.view",
  USER_MANAGE: "user.manage",
  ROLE_MANAGE: "role.manage",
  DASHBOARD_VIEW: "dashboard.view",
  REPORT_VIEW: "report.view",
  AUDIT_VIEW: "audit.view",
  NOTIFICATION_VIEW: "notification.view",
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];

export const RolePermissions: Record<string, string[]> = {
  Admin: Object.values(Permission),
  Technician: [
    Permission.DASHBOARD_VIEW,
    Permission.ASSET_VIEW,
    Permission.TICKET_VIEW,
    Permission.TICKET_UPDATE,
    Permission.TICKET_ESCALATE,
    Permission.TICKET_RESOLVE,
    Permission.NOTIFICATION_VIEW,
  ],
  Employee: [
    Permission.DASHBOARD_VIEW,
    Permission.ASSET_VIEW,
    Permission.TICKET_VIEW,
    Permission.TICKET_CREATE,
    Permission.NOTIFICATION_VIEW,
  ],
  Auditor: [
    Permission.DASHBOARD_VIEW,
    Permission.ASSET_VIEW,
    Permission.TICKET_VIEW,
    Permission.AUDIT_VIEW,
    Permission.REPORT_VIEW,
  ],
};