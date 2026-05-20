import mongoose, { Schema, Document } from "mongoose";
import { TicketStatus, Priority } from "@/shared/enums";

export interface ITicket extends Document {
  ticketNo: string;
  assetId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  priority: Priority;
  status: TicketStatus;
  slaDeadline: Date;
  resolvedAt?: Date;
  comments: {
    author: mongoose.Types.ObjectId;
    body: string;
    createdAt: Date;
  }[];
  attachmentUrls: string[];
  slaBreachNotified: boolean;
  escalationHistory: {
    escalatedBy: mongoose.Types.ObjectId;
    fromPriority: Priority;
    toPriority: Priority;
    escalatedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const TicketSchema = new Schema<ITicket>(
  {
    ticketNo: { type: String, required: true, unique: true },
    assetId: { type: Schema.Types.ObjectId, ref: "Asset", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    priority: { type: String, enum: Object.values(Priority), required: true },
    status: { type: String, enum: Object.values(TicketStatus), default: TicketStatus.OPEN },
    slaDeadline: { type: Date, required: true },
    resolvedAt: { type: Date },
    comments: [
      {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        body: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    attachmentUrls: [{ type: String }],
    slaBreachNotified: { type: Boolean, default: false },
    escalationHistory: [
      {
        escalatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        fromPriority: { type: String, enum: Object.values(Priority), required: true },
        toPriority: { type: String, enum: Object.values(Priority), required: true },
        escalatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

TicketSchema.index({ status: 1, priority: 1, assignedTo: 1, createdAt: -1 });

export const Ticket = mongoose.model<ITicket>("Ticket", TicketSchema);