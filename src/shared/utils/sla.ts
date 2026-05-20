export function calculateSlaDeadline(priority: string): Date {
  const hours: Record<string, number> = {
    CRITICAL: 4,
    HIGH: 24,
    MEDIUM: 72,
    LOW: 168,
  };
  const deadline = new Date();
  deadline.setHours(deadline.getHours() + hours[priority] || 72);
  return deadline;
}

export function isSlaBreached(slaDeadline: Date, status: string): boolean {
  return new Date() > slaDeadline && !["RESOLVED", "CLOSED"].includes(status);
}