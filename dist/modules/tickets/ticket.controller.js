"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.assign = assign;
exports.changeStatus = changeStatus;
exports.addComment = addComment;
exports.remove = remove;
const ticket_service_1 = require("./ticket.service");
const response_1 = require("@/shared/response");
const audit_service_1 = require("@/modules/audit/audit.service");
const ticketService = new ticket_service_1.TicketService();
async function getAll(req, res) {
    try {
        const { tickets, meta } = await ticketService.getAll(req.query, req.user?.id);
        res.json((0, response_1.success)("Tickets retrieved", tickets, meta));
    }
    catch (err) {
        res.status(500).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function getById(req, res) {
    try {
        const ticket = await ticketService.getById(req.params.id);
        res.json((0, response_1.success)("Ticket retrieved", ticket));
    }
    catch (err) {
        res.status(404).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function create(req, res) {
    try {
        const ticket = await ticketService.create({ ...req.body, createdBy: req.user.id });
        await audit_service_1.auditService.log(req.user.id, "Ticket created", "Ticket", ticket._id.toString(), undefined, req.body, req.id);
        res.status(201).json((0, response_1.success)("Ticket created", ticket));
    }
    catch (err) {
        res.status(400).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function update(req, res) {
    try {
        const existingTicket = await ticketService.getById(req.params.id);
        const ticket = await ticketService.update(req.params.id, req.body);
        await audit_service_1.auditService.log(req.user.id, "Ticket updated", "Ticket", ticket._id.toString(), existingTicket, req.body, req.id);
        res.json((0, response_1.success)("Ticket updated", ticket));
    }
    catch (err) {
        res.status(400).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function assign(req, res) {
    try {
        const { userId } = req.body;
        const ticket = await ticketService.assign(req.params.id, userId);
        res.json((0, response_1.success)("Ticket assigned", ticket));
    }
    catch (err) {
        res.status(400).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function changeStatus(req, res) {
    try {
        const { status } = req.body;
        const ticket = await ticketService.changeStatus(req.params.id, status);
        res.json((0, response_1.success)("Ticket status changed", ticket));
    }
    catch (err) {
        res.status(400).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function addComment(req, res) {
    try {
        const { body } = req.body;
        const ticket = await ticketService.addComment(req.params.id, req.user.id, body);
        res.json((0, response_1.success)("Comment added", ticket));
    }
    catch (err) {
        res.status(400).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function remove(req, res) {
    try {
        const { Ticket } = await Promise.resolve().then(() => __importStar(require("./ticket.model")));
        const ticket = await Ticket.findById(req.params.id);
        await Ticket.findByIdAndDelete(req.params.id);
        await audit_service_1.auditService.log(req.user.id, "Ticket deleted", "Ticket", req.params.id, ticket?.toObject(), undefined, req.id);
        res.json((0, response_1.success)("Ticket deleted"));
    }
    catch (err) {
        res.status(500).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
//# sourceMappingURL=ticket.controller.js.map