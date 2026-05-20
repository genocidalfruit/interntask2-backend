import { ITicket } from "./ticket.model";
import { TicketStatus } from "@/shared/enums";
export declare class TicketService {
    getAll(query: Record<string, unknown>, userId?: string): Promise<{
        tickets: (import("mongoose").Document<unknown, {}, ITicket, {}, import("mongoose").DefaultSchemaOptions> & ITicket & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getById(id: string): Promise<import("mongoose").Document<unknown, {}, ITicket, {}, import("mongoose").DefaultSchemaOptions> & ITicket & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    create(data: Partial<ITicket> & {
        createdBy: string;
    }): Promise<import("mongoose").Document<unknown, {}, ITicket, {}, import("mongoose").DefaultSchemaOptions> & ITicket & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, data: Partial<ITicket>): Promise<import("mongoose").Document<unknown, {}, ITicket, {}, import("mongoose").DefaultSchemaOptions> & ITicket & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    assign(id: string, userId: string): Promise<import("mongoose").Document<unknown, {}, ITicket, {}, import("mongoose").DefaultSchemaOptions> & ITicket & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    changeStatus(id: string, newStatus: TicketStatus, adminOverride?: boolean): Promise<import("mongoose").Document<unknown, {}, ITicket, {}, import("mongoose").DefaultSchemaOptions> & ITicket & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    addComment(id: string, author: string, body: string): Promise<import("mongoose").Document<unknown, {}, ITicket, {}, import("mongoose").DefaultSchemaOptions> & ITicket & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getSlaBreaches(): Promise<(import("mongoose").Document<unknown, {}, ITicket, {}, import("mongoose").DefaultSchemaOptions> & ITicket & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    markSlaBreached(id: string): Promise<void>;
}
