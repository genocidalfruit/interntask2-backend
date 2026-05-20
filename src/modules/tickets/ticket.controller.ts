import { Response } from "express";
import { TicketService } from "./ticket.service";
import { success, error } from "@/shared/response";
import { AuthRequest } from "@/middleware/auth.middleware";
import { auditService } from "@/modules/audit/audit.service";

const ticketService = new TicketService();

export async function getAll(req: AuthRequest, res: Response) {
  try {
    const { tickets, meta } = await ticketService.getAll(req.query, req.user?.id);
    res.json(success("Tickets retrieved", tickets, meta));
  } catch (err: any) {
    res.status(500).json(error(err.message, undefined, req.id));
  }
}

export async function getById(req: AuthRequest, res: Response) {
  try {
    const ticket = await ticketService.getById(req.params.id);
    res.json(success("Ticket retrieved", ticket));
  } catch (err: any) {
    res.status(404).json(error(err.message, undefined, req.id));
  }
}

export async function create(req: AuthRequest, res: Response) {
  try {
    const ticket = await ticketService.create({ ...req.body, createdBy: req.user!.id });
    await auditService.log(req.user!.id, "Ticket created", "Ticket", ticket._id.toString(), undefined, req.body, req.id);
    res.status(201).json(success("Ticket created", ticket));
  } catch (err: any) {
    res.status(400).json(error(err.message, undefined, req.id));
  }
}

export async function update(req: AuthRequest, res: Response) {
  try {
    const existingTicket = await ticketService.getById(req.params.id);
    const ticket = await ticketService.update(req.params.id, req.body);
    await auditService.log(req.user!.id, "Ticket updated", "Ticket", ticket._id.toString(), existingTicket, req.body, req.id);
    res.json(success("Ticket updated", ticket));
  } catch (err: any) {
    res.status(400).json(error(err.message, undefined, req.id));
  }
}

export async function assign(req: AuthRequest, res: Response) {
  try {
    const { userId } = req.body;
    const ticket = await ticketService.assign(req.params.id, userId);
    res.json(success("Ticket assigned", ticket));
  } catch (err: any) {
    res.status(400).json(error(err.message, undefined, req.id));
  }
}

export async function changeStatus(req: AuthRequest, res: Response) {
  try {
    const { status } = req.body;
    const existingTicket = await ticketService.getById(req.params.id);
    const ticket = await ticketService.changeStatus(req.params.id, status);
    await auditService.log(
      req.user!.id,
      `Ticket status changed from ${existingTicket.status} to ${ticket.status}`,
      "Ticket",
      ticket._id.toString(),
      { status: existingTicket.status },
      { status: ticket.status },
      req.id
    );
    res.json(success("Ticket status changed", ticket));
  } catch (err: any) {
    res.status(400).json(error(err.message, undefined, req.id));
  }
}

export async function addComment(req: AuthRequest, res: Response) {
  try {
    const { body } = req.body;
    const ticket = await ticketService.addComment(req.params.id, req.user!.id, body);
    res.json(success("Comment added", ticket));
  } catch (err: any) {
    res.status(400).json(error(err.message, undefined, req.id));
  }
}

export async function remove(req: AuthRequest, res: Response) {
  try {
    const { Ticket } = await import("./ticket.model");
    const ticket = await Ticket.findById(req.params.id);
    await Ticket.findByIdAndDelete(req.params.id);
    await auditService.log(req.user!.id, "Ticket deleted", "Ticket", req.params.id, ticket?.toObject(), undefined, req.id);
    res.json(success("Ticket deleted"));
  } catch (err: any) {
    res.status(500).json(error(err.message, undefined, req.id));
  }
}

export async function escalate(req: AuthRequest, res: Response) {
  try {
    const existingTicket = await ticketService.getById(req.params.id);
    const ticket = await ticketService.escalate(req.params.id, req.user!.id);
    await auditService.log(
      req.user!.id,
      `Ticket escalated from ${existingTicket.priority} to ${ticket.priority}`,
      "Ticket",
      ticket._id.toString(),
      { priority: existingTicket.priority },
      { priority: ticket.priority },
      req.id
    );
    res.json(success("Ticket escalated", ticket));
  } catch (err: any) {
    if (err.message.includes("maximum priority")) {
      res.status(400).json(error(err.message, undefined, req.id));
    } else {
      res.status(400).json(error(err.message, undefined, req.id));
    }
  }
}