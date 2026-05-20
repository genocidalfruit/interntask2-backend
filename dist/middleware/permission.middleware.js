"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirePermission = requirePermission;
const response_1 = require("@/shared/response");
const role_model_1 = require("@/modules/roles/role.model");
function requirePermission(...permissions) {
    return async (req, res, next) => {
        try {
            const role = await role_model_1.Role.findById(req.user.roleId);
            if (!role) {
                return res.status(403).json((0, response_1.error)("Forbidden", undefined, req.id));
            }
            const hasAll = permissions.every((p) => role.permissions.includes(p));
            if (!hasAll) {
                return res.status(403).json((0, response_1.error)("Forbidden", undefined, req.id));
            }
            next();
        }
        catch {
            return res.status(500).json((0, response_1.error)("Internal server error", undefined, req.id));
        }
    };
}
//# sourceMappingURL=permission.middleware.js.map