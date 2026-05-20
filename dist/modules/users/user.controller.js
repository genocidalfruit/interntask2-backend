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
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.remove = remove;
const user_service_1 = require("./user.service");
const response_1 = require("@/shared/response");
const audit_service_1 = require("@/modules/audit/audit.service");
const userService = new user_service_1.UserService();
async function getAll(req, res) {
    try {
        const users = await userService.getAll();
        res.json((0, response_1.success)("Users retrieved", users));
    }
    catch (err) {
        res.status(500).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function getById(req, res) {
    try {
        const user = await userService.getById(req.params.id);
        res.json((0, response_1.success)("User retrieved", user));
    }
    catch (err) {
        res.status(404).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function create(req, res) {
    try {
        const user = await userService.create(req.body);
        await audit_service_1.auditService.log(req.user.id, "User created", "User", user._id.toString(), undefined, req.body, req.id);
        res.status(201).json((0, response_1.success)("User created", user));
    }
    catch (err) {
        res.status(400).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function update(req, res) {
    try {
        const existingUser = await userService.getById(req.params.id);
        const user = await userService.update(req.params.id, req.body);
        await audit_service_1.auditService.log(req.user.id, "User updated", "User", user._id.toString(), existingUser, req.body, req.id);
        res.json((0, response_1.success)("User updated", user));
    }
    catch (err) {
        res.status(400).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function remove(req, res) {
    try {
        const { User } = await Promise.resolve().then(() => __importStar(require("./user.model")));
        const user = await User.findById(req.params.id);
        await User.findByIdAndDelete(req.params.id);
        await audit_service_1.auditService.log(req.user.id, "User deleted", "User", req.params.id, user?.toObject(), undefined, req.id);
        res.json((0, response_1.success)("User deleted"));
    }
    catch (err) {
        res.status(500).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
//# sourceMappingURL=user.controller.js.map