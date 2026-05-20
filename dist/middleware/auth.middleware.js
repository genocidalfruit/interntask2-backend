"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@/config");
const response_1 = require("@/shared/response");
const user_model_1 = require("@/modules/users/user.model");
async function authMiddleware(req, res, next) {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json((0, response_1.error)("Unauthorized", undefined, req.id));
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret);
        const user = await user_model_1.User.findById(decoded.userId).select("status");
        if (!user || user.status !== "ACTIVE") {
            return res.status(401).json((0, response_1.error)("Unauthorized", undefined, req.id));
        }
        req.user = { ...decoded, id: decoded.userId };
        next();
    }
    catch {
        return res.status(401).json((0, response_1.error)("Unauthorized", undefined, req.id));
    }
}
//# sourceMappingURL=auth.middleware.js.map