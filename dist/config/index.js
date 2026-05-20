"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    env: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT || "3001", 10),
    mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/assets-db",
    jwt: {
        secret: process.env.JWT_SECRET || "dev-jwt-secret",
        expiresIn: "15m",
    },
    refreshToken: {
        secret: process.env.REFRESH_TOKEN_SECRET || "dev-refresh-secret",
        expiresIn: "7d",
    },
    cookie: {
        domain: process.env.NODE_ENV === "production"
            ? process.env.COOKIE_DOMAIN || undefined
            : undefined,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    },
    cors: {
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    },
};
//# sourceMappingURL=index.js.map