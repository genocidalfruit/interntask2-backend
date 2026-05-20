"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSlaDeadline = calculateSlaDeadline;
exports.isSlaBreached = isSlaBreached;
function calculateSlaDeadline(priority) {
    const hours = {
        CRITICAL: 4,
        HIGH: 24,
        MEDIUM: 72,
        LOW: 168,
    };
    const deadline = new Date();
    deadline.setHours(deadline.getHours() + hours[priority] || 72);
    return deadline;
}
function isSlaBreached(slaDeadline, status) {
    return new Date() > slaDeadline && !["RESOLVED", "CLOSED"].includes(status);
}
//# sourceMappingURL=sla.js.map