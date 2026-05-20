import mongoose, { Document } from "mongoose";
export interface IAuditLog extends Document {
    actor: mongoose.Types.ObjectId;
    action: string;
    entityType: string;
    entityId: mongoose.Types.ObjectId;
    before?: Record<string, unknown>;
    after?: Record<string, unknown>;
    traceId: string;
    createdAt: Date;
}
export declare const AuditLog: mongoose.Model<IAuditLog, {}, {}, {}, mongoose.Document<unknown, {}, IAuditLog, {}, mongoose.DefaultSchemaOptions> & IAuditLog & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IAuditLog>;
