"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const role_model_1 = require("./role.model");
class RoleService {
    async getAll() {
        return role_model_1.Role.find();
    }
    async getById(id) {
        const role = await role_model_1.Role.findById(id);
        if (!role)
            throw new Error("Role not found");
        return role;
    }
    async create(data) {
        const role = await role_model_1.Role.create(data);
        return role;
    }
    async update(id, data) {
        const role = await role_model_1.Role.findByIdAndUpdate(id, data, { new: true });
        if (!role)
            throw new Error("Role not found");
        return role;
    }
}
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map