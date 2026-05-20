import { Ticket, ITicket } from "./ticket.model";
import { TicketStatus, Priority } from "@/shared/enums";
import { parsePagination, getMeta, getSortObject } from "@/shared/utils/pagination";
import { calculateSlaDeadline } from "@/shared/utils/sla";

const validTransitions: Record<TicketStatus, TicketStatus[]> = {
  OPEN: [TicketStatus.IN_PROGRESS, TicketStatus.RESOLVED],
  IN_PROGRESS: [TicketStatus.PENDING, TicketStatus.RESOLVED],
  PENDING: [TicketStatus.IN_PROGRESS, TicketStatus.RESOLVED],
  RESOLVED: [TicketStatus.CLOSED],
  CLOSED: [],
};

export class TicketService {
  async getAll(query: Record<string, unknown>, userId?: string) {
    const { page, limit, sort } = parsePagination(query);
    const filter: Record<string, unknown> = {};
    if (query.status) filter.status = query.status;
    if (query.priority) filter.priority = query.priority;
    if (query.assignedTo) filter.assignedTo = query.assignedTo;

    if (userId && query.scope) {
      const scope = query.scope as string;
      if (scope === "created") {
        filter.createdBy = userId;
      } else if (scope === "assigned") {
        filter.assignedTo = userId;
      } else if (scope === "mine") {
        filter.$or = [
          { createdBy: userId },
          { assignedTo: userId },
        ];
      }
    }

    const [tickets, total] = await Promise.all([
      Ticket.find(filter)
        .populate("assetId", "name assetCode")
        .populate("createdBy", "name email")
        .populate("assignedTo", "name email")
        .sort(getSortObject(sort))
        .skip((page - 1) * limit)
        .limit(limit),
      Ticket.countDocuments(filter),
    ]);

    return { tickets, meta: getMeta(page, limit, total) };
  }

  async getById(id: string) {
    const ticket = await Ticket.findById(id)
      .populate("assetId", "name assetCode")
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .populate("comments.author", "name");
    if (!ticket) throw new Error("Ticket not found");
    return ticket;
  }

  async create(data: Partial<ITicket> & { createdBy: string }) {
    const ticketNo = `TK-${String(await Ticket.countDocuments() + 1).padStart(3, "0")}`;
    const slaDeadline = calculateSlaDeadline(data.priority as string);
    const ticket = await Ticket.create({ ...data, ticketNo, slaDeadline });
    return ticket;
  }

  async update(id: string, data: Partial<ITicket>) {
    const ticket = await Ticket.findByIdAndUpdate(id, data, { new: true });
    if (!ticket) throw new Error("Ticket not found");
    return ticket;
  }

  async assign(id: string, userId: string) {
    const ticket = await Ticket.findByIdAndUpdate(id, { assignedTo: userId }, { new: true });
    if (!ticket) throw new Error("Ticket not found");
    return ticket;
  }

  async changeStatus(id: string, newStatus: TicketStatus, adminOverride = false) {
    const ticket = await Ticket.findById(id);
    if (!ticket) throw new Error("Ticket not found");

    const allowed = validTransitions[ticket.status];
    if (!allowed.includes(newStatus)) {
      if (!(newStatus === TicketStatus.RESOLVED && ticket.status === TicketStatus.OPEN && adminOverride)) {
        throw new Error(`Invalid transition from ${ticket.status} to ${newStatus}`);
      }
    }

    if (newStatus === TicketStatus.RESOLVED && !ticket.resolvedAt) {
      ticket.resolvedAt = new Date();
    }

    ticket.status = newStatus;
    await ticket.save();
    return ticket;
  }

  async addComment(id: string, author: string, body: string) {
    const ticket = await Ticket.findById(id);
    if (!ticket) throw new Error("Ticket not found");

    ticket.comments.push({ author: author as any, body, createdAt: new Date() });
    await ticket.save();
    return ticket;
  }

  async getSlaBreaches() {
    return Ticket.find({
      slaDeadline: { $lt: new Date() },
      status: { $nin: [TicketStatus.RESOLVED, TicketStatus.CLOSED] },
      slaBreachNotified: false,
    });
  }

  async markSlaBreached(id: string) {
    await Ticket.findByIdAndUpdate(id, { slaBreachNotified: true });
  }
}