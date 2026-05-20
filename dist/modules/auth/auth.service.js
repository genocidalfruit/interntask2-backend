"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@/config");
const user_model_1 = require("@/modules/users/user.model");
class AuthService {
    async login(email, password) {
        const user = await user_model_1.User.findOne({ email }).populate("roleId");
        if (!user)
            throw new Error("Invalid credentials");
        const valid = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!valid)
            throw new Error("Invalid credentials");
        if (user.status !== "ACTIVE")
            throw new Error("Account is not active");
        const roleId = user.roleId instanceof Object ? user.roleId._id.toString() : user.roleId.toString();
        const payload = {
            userId: user._id.toString(),
            email: user.email,
            roleId,
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
        const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.config.refreshToken.secret, { expiresIn: config_1.config.refreshToken.expiresIn });
        user.refreshToken = refreshToken;
        await user.save();
        return { accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email, roleId: user.roleId } };
    }
    async refresh(refreshToken) {
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.config.refreshToken.secret);
            const user = await user_model_1.User.findById(decoded.userId);
            if (!user || user.refreshToken !== refreshToken) {
                throw new Error("Invalid refresh token");
            }
            const roleId = user.roleId instanceof Object ? user.roleId._id.toString() : user.roleId.toString();
            const payload = {
                userId: user._id.toString(),
                email: user.email,
                roleId,
            };
            const newAccessToken = jsonwebtoken_1.default.sign(payload, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
            const newRefreshToken = jsonwebtoken_1.default.sign(payload, config_1.config.refreshToken.secret, { expiresIn: config_1.config.refreshToken.expiresIn });
            user.refreshToken = newRefreshToken;
            await user.save();
            return { accessToken: newAccessToken, refreshToken: newRefreshToken };
        }
        catch {
            throw new Error("Invalid refresh token");
        }
    }
    async logout(userId) {
        await user_model_1.User.findByIdAndUpdate(userId, { refreshToken: null });
    }
    async getMe(userId) {
        const user = await user_model_1.User.findById(userId).populate("roleId", "name permissions");
        if (!user)
            throw new Error("User not found");
        return { id: user._id, name: user.name, email: user.email, role: user.roleId, status: user.status };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map