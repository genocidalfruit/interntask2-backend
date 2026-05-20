export interface User {
    _id: string;
    name: string;
    email: string;
    passwordHash: string;
    roleId: string;
    status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
    createdAt: Date;
    updatedAt: Date;
}
export interface Role {
    _id: string;
    name: string;
    permissions: string[];
    createdAt: Date;
    updatedAt: Date;
}
export interface Asset {
    _id: string;
    assetCode: string;
    name: string;
    category: string;
    assignedTo?: string;
    status: "AVAILABLE" | "ASSIGNED" | "MAINTENANCE" | "RETIRED" | "LOST";
    purchaseDate: Date;
    warrantyExpiry?: Date;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Ticket {
    _id: string;
    ticketNo: string;
    assetId: string;
    createdBy: string;
    assignedTo?: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    status: "OPEN" | "IN_PROGRESS" | "PENDING" | "RESOLVED" | "CLOSED";
    slaDeadline: Date;
    resolvedAt?: Date;
    comments: {
        author: string;
        body: string;
        createdAt: Date;
    }[];
    attachmentUrls: string[];
    createdAt: Date;
    updatedAt: Date;
}
export interface Menu {
    _id: string;
    label: string;
    icon: string;
    path: string;
    permissions: string[];
    parentId?: string;
    order: number;
}
export interface AuditLog {
    _id: string;
    actor: string;
    action: string;
    entityType: string;
    entityId: string;
    before?: Record<string, unknown>;
    after?: Record<string, unknown>;
    traceId: string;
    createdAt: Date;
}
export interface Notification {
    _id: string;
    userId: string;
    type: "TICKET_ASSIGNED" | "SLA_BREACH" | "MAINTENANCE_DUE";
    message: string;
    read: boolean;
    entityId?: string;
    createdAt: Date;
}
export interface DecodedToken {
    userId: string;
    email: string;
    roleId: string;
}
export interface PaginationQuery {
    page: number;
    limit: number;
    sort: string;
}
