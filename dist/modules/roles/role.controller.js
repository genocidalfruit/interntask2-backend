"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.create = create;
exports.update = update;
exports.remove = remove;
const role_service_1 = require("./role.service");
const response_1 = require("@/shared/response");
const audit_service_1 = require("@/modules/audit/audit.service");
const roleService = new role_service_1.RoleService();
async function getAll(req, res) {
    try {
        const roles = await roleService.getAll();
        res.json((0, response_1.success)("Roles retrieved", roles));
    }
    catch (err) {
        res.status(500).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function create(req, res) {
    try {
        const role = await roleService.create(req.body);
        await audit_service_1.auditService.log(req.user.id, "Role created", "Role", role._id.toString(), undefined, req.body, req.id);
        res.status(201).json((0, response_1.success)("Role created", role));
    }
    catch (err) {
        res.status(400).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function update(req, res) {
    try {
        const existingRole = await roleService.getAll().then(r => r.find(r => r._id === req.params.id));
        const role = await roleService.update(req.params.id, req.body);
        await audit_service_1.auditService.log(req.user.id, "Role updated", "Role", role._id.toString(), existingRole, req.body, req.id);
        res.json((0, response_1.success)("Role updated", role));
    }
    catch (err) {
        res.status(400).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function remove(req, res) {
    try {
        const { Role } = await Promise.resolve().then(() => __importStar(require("./role.model")));
        const role = await Role.findById(req.params.id);
        await Role.findByIdAndDelete(req.params.id);
        await audit_service_1.auditService.log(req.user.id, "Role deleted", "Role", req.params.id, role?.toObject(), undefined, req.id);
        res.json((0, response_1.success)("Role deleted"));
    }
    catch (err) {
        res.status(500).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
//# sourceMappingURL=role.controller.js.map