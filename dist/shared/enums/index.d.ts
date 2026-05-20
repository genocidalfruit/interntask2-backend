export declare enum AssetStatus {
    AVAILABLE = "AVAILABLE",
    ASSIGNED = "ASSIGNED",
    MAINTENANCE = "MAINTENANCE",
    RETIRED = "RETIRED",
    LOST = "LOST"
}
export declare enum TicketStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    PENDING = "PENDING",
    RESOLVED = "RESOLVED",
    CLOSED = "CLOSED"
}
export declare enum Priority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    CRITICAL = "CRITICAL"
}
export declare enum UserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    SUSPENDED = "SUSPENDED"
}
export declare enum NotificationType {
    TICKET_ASSIGNED = "TICKET_ASSIGNED",
    SLA_BREACH = "SLA_BREACH",
    MAINTENANCE_DUE = "MAINTENANCE_DUE"
}
