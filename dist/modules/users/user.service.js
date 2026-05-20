"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("./user.model");
const enums_1 = require("@/shared/enums");
class UserService {
    async getAll() {
        return user_model_1.User.find().populate("roleId", "name");
    }
    async getById(id) {
        const user = await user_model_1.User.findById(id).populate("roleId", "name permissions");
        if (!user)
            throw new Error("User not found");
        return user;
    }
    async create(data) {
        const passwordHash = await bcryptjs_1.default.hash(data.password, 10);
        const { password, ...rest } = data;
        const user = await user_model_1.User.create({ ...rest, passwordHash });
        return user;
    }
    async update(id, data) {
        if (data.status && !Object.values(enums_1.UserStatus).includes(data.status)) {
            throw new Error("Invalid status");
        }
        const user = await user_model_1.User.findByIdAndUpdate(id, data, { new: true });
        if (!user)
            throw new Error("User not found");
        return user;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map