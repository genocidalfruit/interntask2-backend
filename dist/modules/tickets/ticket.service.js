"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const ticket_model_1 = require("./ticket.model");
const enums_1 = require("@/shared/enums");
const pagination_1 = require("@/shared/utils/pagination");
const sla_1 = require("@/shared/utils/sla");
const validTransitions = {
    OPEN: [enums_1.TicketStatus.IN_PROGRESS, enums_1.TicketStatus.RESOLVED],
    IN_PROGRESS: [enums_1.TicketStatus.PENDING, enums_1.TicketStatus.RESOLVED],
    PENDING: [enums_1.TicketStatus.IN_PROGRESS, enums_1.TicketStatus.RESOLVED],
    RESOLVED: [enums_1.TicketStatus.CLOSED],
    CLOSED: [],
};
class TicketService {
    async getAll(query, userId) {
        const { page, limit, sort } = (0, pagination_1.parsePagination)(query);
        const filter = {};
        if (query.status)
            filter.status = query.status;
        if (query.priority)
            filter.priority = query.priority;
        if (query.assignedTo)
            filter.assignedTo = query.assignedTo;
        if (userId && query.scope) {
            const scope = query.scope;
            if (scope === "created") {
                filter.createdBy = userId;
            }
            else if (scope === "assigned") {
                filter.assignedTo = userId;
            }
            else if (scope === "mine") {
                filter.$or = [
                    { createdBy: userId },
                    { assignedTo: userId },
                ];
            }
        }
        const [tickets, total] = await Promise.all([
            ticket_model_1.Ticket.find(filter)
                .populate("assetId", "name assetCode")
                .populate("createdBy", "name email")
                .populate("assignedTo", "name email")
                .sort((0, pagination_1.getSortObject)(sort))
                .skip((page - 1) * limit)
                .limit(limit),
            ticket_model_1.Ticket.countDocuments(filter),
        ]);
        return { tickets, meta: (0, pagination_1.getMeta)(page, limit, total) };
    }
    async getById(id) {
        const ticket = await ticket_model_1.Ticket.findById(id)
            .populate("assetId", "name assetCode")
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email")
            .populate("comments.author", "name");
        if (!ticket)
            throw new Error("Ticket not found");
        return ticket;
    }
    async create(data) {
        const ticketNo = `TK-${String(await ticket_model_1.Ticket.countDocuments() + 1).padStart(3, "0")}`;
        const slaDeadline = (0, sla_1.calculateSlaDeadline)(data.priority);
        const ticket = await ticket_model_1.Ticket.create({ ...data, ticketNo, slaDeadline });
        return ticket;
    }
    async update(id, data) {
        const ticket = await ticket_model_1.Ticket.findByIdAndUpdate(id, data, { new: true });
        if (!ticket)
            throw new Error("Ticket not found");
        return ticket;
    }
    async assign(id, userId) {
        const ticket = await ticket_model_1.Ticket.findByIdAndUpdate(id, { assignedTo: userId }, { new: true });
        if (!ticket)
            throw new Error("Ticket not found");
        return ticket;
    }
    async changeStatus(id, newStatus, adminOverride = false) {
        const ticket = await ticket_model_1.Ticket.findById(id);
        if (!ticket)
            throw new Error("Ticket not found");
        const allowed = validTransitions[ticket.status];
        if (!allowed.includes(newStatus)) {
            if (!(newStatus === enums_1.TicketStatus.RESOLVED && ticket.status === enums_1.TicketStatus.OPEN && adminOverride)) {
                throw new Error(`Invalid transition from ${ticket.status} to ${newStatus}`);
            }
        }
        if (newStatus === enums_1.TicketStatus.RESOLVED && !ticket.resolvedAt) {
            ticket.resolvedAt = new Date();
        }
        ticket.status = newStatus;
        await ticket.save();
        return ticket;
    }
    async addComment(id, author, body) {
        const ticket = await ticket_model_1.Ticket.findById(id);
        if (!ticket)
            throw new Error("Ticket not found");
        ticket.comments.push({ author: author, body, createdAt: new Date() });
        await ticket.save();
        return ticket;
    }
    async getSlaBreaches() {
        return ticket_model_1.Ticket.find({
            slaDeadline: { $lt: new Date() },
            status: { $nin: [enums_1.TicketStatus.RESOLVED, enums_1.TicketStatus.CLOSED] },
            slaBreachNotified: false,
        });
    }
    async markSlaBreached(id) {
        await ticket_model_1.Ticket.findByIdAndUpdate(id, { slaBreachNotified: true });
    }
}
exports.TicketService = TicketService;
//# sourceMappingURL=ticket.service.js.map