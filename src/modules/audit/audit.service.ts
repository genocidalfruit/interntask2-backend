import { AuditLog } from "./audit.model";
import mongoose from "mongoose";

export class AuditService {
  async log(
    actor: string,
    action: string,
    entityType: string,
    entityId: string,
    before?: Record<string, unknown>,
    after?: Record<string, unknown>,
    traceId?: string
  ) {
    try {
      await AuditLog.create({
        actor: new mongoose.Types.ObjectId(actor),
        action,
        entityType,
        entityId: new mongoose.Types.ObjectId(entityId),
        before,
        after,
        traceId: traceId || "",
      });
    } catch (err) {
      console.error("Audit log failed:", err);
    }
  }

  async getAll(query: Record<string, unknown>) {
    const filter: Record<string, unknown> = {};
    if (query.entityType) filter.entityType = query.entityType;
    if (query.entityId) filter.entityId = query.entityId;
    if (query.actor) filter.actor = query.actor;
    if (query.dateFrom || query.dateTo) {
      filter.createdAt = {};
      if (query.dateFrom) (filter.createdAt as any).$gte = new Date(query.dateFrom as string);
      if (query.dateTo) (filter.createdAt as any).$lte = new Date(query.dateTo as string);
    }

    const logs = await AuditLog.find(filter)
      .populate("actor", "name email")
      .sort({ createdAt: -1 });

    return { logs, meta: { page: 1, limit: logs.length, total: logs.length, totalPages: 1 } };
  }
}

export const auditService = new AuditService();
