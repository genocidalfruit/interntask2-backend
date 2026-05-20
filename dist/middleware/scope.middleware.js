"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scopeTickets = scopeTickets;
exports.scopeAssets = scopeAssets;
const user_model_1 = require("@/modules/users/user.model");
function hasPerm(permissions, perm) {
    return permissions.includes(perm);
}
async function getUserPermissions(userId) {
    const user = await user_model_1.User.findById(userId).populate("roleId", "permissions");
    if (!user || !user.roleId)
        return [];
    return user.roleId.permissions || [];
}
function scopeTickets(req, _res, next) {
    (async () => {
        if (!req.user?.id)
            return next();
        const perms = await getUserPermissions(req.user.id);
        const isEmployee = !hasPerm(perms, "ticket.update") &&
            !hasPerm(perms, "audit.view") &&
            !hasPerm(perms, "report.view");
        if (isEmployee) {
            req.query.scope = "mine";
        }
        next();
    })().catch(next);
}
function scopeAssets(req, _res, next) {
    (async () => {
        if (!req.user?.id)
            return next();
        const perms = await getUserPermissions(req.user.id);
        const isEmployee = !hasPerm(perms, "audit.view") &&
            !hasPerm(perms, "report.view") &&
            !hasPerm(perms, "asset.update") &&
            !hasPerm(perms, "asset.assign");
        if (isEmployee) {
            req.query.scope = "assigned";
        }
        next();
    })().catch(next);
}
//# sourceMappingURL=scope.middleware.js.map