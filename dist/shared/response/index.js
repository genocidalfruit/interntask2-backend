"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = success;
exports.error = error;
function success(message, data, meta) {
    return { success: true, message, data, meta };
}
function error(message, errors, traceId) {
    return { success: false, message, errors, traceId };
}
//# sourceMappingURL=index.js.map