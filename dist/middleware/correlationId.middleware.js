"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.correlationIdMiddleware = correlationIdMiddleware;
const uuid_1 = require("uuid");
function correlationIdMiddleware(req, res, next) {
    const id = (0, uuid_1.v4)();
    req.id = id;
    res.id = id;
    next();
}
//# sourceMappingURL=correlationId.middleware.js.map