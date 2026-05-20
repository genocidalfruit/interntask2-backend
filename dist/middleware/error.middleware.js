"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const response_1 = require("@/shared/response");
function errorMiddleware(err, _req, res, _next) {
    console.error(err.stack);
    const traceId = res.id;
    res.status(500).json((0, response_1.error)("Internal server error", undefined, traceId));
}
//# sourceMappingURL=error.middleware.js.map