"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditService = exports.AuditService = void 0;
const audit_model_1 = require("./audit.model");
const mongoose_1 = __importDefault(require("mongoose"));
class AuditService {
    async log(actor, action, entityType, entityId, before, after, traceId) {
        try {
            await audit_model_1.AuditLog.create({
                actor: new mongoose_1.default.Types.ObjectId(actor),
                action,
                entityType,
                entityId: new mongoose_1.default.Types.ObjectId(entityId),
                before,
                after,
                traceId: traceId || "",
            });
        }
        catch (err) {
            console.error("Audit log failed:", err);
        }
    }
    async getAll(query) {
        const filter = {};
        if (query.entityType)
            filter.entityType = query.entityType;
        if (query.entityId)
            filter.entityId = query.entityId;
        if (query.actor)
            filter.actor = query.actor;
        if (query.dateFrom || query.dateTo) {
            filter.createdAt = {};
            if (query.dateFrom)
                filter.createdAt.$gte = new Date(query.dateFrom);
            if (query.dateTo)
                filter.createdAt.$lte = new Date(query.dateTo);
        }
        const logs = await audit_model_1.AuditLog.find(filter)
            .populate("actor", "name email")
            .sort({ createdAt: -1 });
        return { logs, meta: { page: 1, limit: logs.length, total: logs.length, totalPages: 1 } };
    }
}
exports.AuditService = AuditService;
exports.auditService = new AuditService();
//# sourceMappingURL=audit.service.js.map