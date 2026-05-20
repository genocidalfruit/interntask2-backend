"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
const audit_service_1 = require("./audit.service");
const response_1 = require("@/shared/response");
async function getAll(req, res) {
    try {
        const { logs, meta } = await audit_service_1.auditService.getAll(req.query);
        res.json((0, response_1.success)("Audit logs retrieved", logs, meta));
    }
    catch (err) {
        res.status(500).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
//# sourceMappingURL=audit.controller.js.map