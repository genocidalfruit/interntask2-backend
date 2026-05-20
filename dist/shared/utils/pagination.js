"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePagination = parsePagination;
exports.getMeta = getMeta;
exports.getSortObject = getSortObject;
function parsePagination(query) {
    const page = Math.max(1, parseInt(query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
    const sort = query.sort || "-createdAt";
    return { page, limit, sort };
}
function getMeta(page, limit, total) {
    const totalPages = Math.ceil(total / limit);
    return { page, limit, total, totalPages };
}
function getSortObject(sortString) {
    const [field, order] = sortString.startsWith("-")
        ? [sortString.slice(1), -1]
        : [sortString, 1];
    return { [field]: order };
}
//# sourceMappingURL=pagination.js.map