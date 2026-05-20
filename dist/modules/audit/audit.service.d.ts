import mongoose from "mongoose";
export declare class AuditService {
    log(actor: string, action: string, entityType: string, entityId: string, before?: Record<string, unknown>, after?: Record<string, unknown>, traceId?: string): Promise<void>;
    getAll(query: Record<string, unknown>): Promise<{
        logs: (mongoose.Document<unknown, {}, import("./audit.model").IAuditLog, {}, mongoose.DefaultSchemaOptions> & import("./audit.model").IAuditLog & Required<{
            _id: mongoose.Types.ObjectId;
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
}
export declare const auditService: AuditService;
