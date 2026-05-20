"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = require("@/config");
const database_1 = require("@/config/database");
const correlationId_middleware_1 = require("@/middleware/correlationId.middleware");
const error_middleware_1 = require("@/middleware/error.middleware");
const routes_1 = __importDefault(require("@/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: config_1.config.cors.origin, credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(correlationId_middleware_1.correlationIdMiddleware);
app.use("/api/v1", routes_1.default);
app.use(error_middleware_1.errorMiddleware);
async function start() {
    await (0, database_1.connectDb)();
    app.listen(config_1.config.port, () => {
        console.log(`Server running on http://localhost:${config_1.config.port}`);
        console.log(`Environment: ${config_1.config.env}`);
    });
}
start();
exports.default = app;
//# sourceMappingURL=app.js.map