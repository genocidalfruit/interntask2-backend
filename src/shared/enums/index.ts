export enum AssetStatus {
  AVAILABLE = "AVAILABLE",
  ASSIGNED = "ASSIGNED",
  MAINTENANCE = "MAINTENANCE",
  RETIRED = "RETIRED",
  LOST = "LOST",
}

export enum TicketStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING = "PENDING",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}

export enum NotificationType {
  TICKET_ASSIGNED = "TICKET_ASSIGNED",
  SLA_BREACH = "SLA_BREACH",
  MAINTENANCE_DUE = "MAINTENANCE_DUE",
}