import mongoose, { Document } from "mongoose";
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
    createdAt: Date;
    updatedAt: Date;
}
export declare const Ticket: mongoose.Model<ITicket, {}, {}, {}, mongoose.Document<unknown, {}, ITicket, {}, mongoose.DefaultSchemaOptions> & ITicket & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITicket>;
