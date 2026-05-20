"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.refresh = refresh;
exports.logout = logout;
exports.me = me;
const auth_service_1 = require("./auth.service");
const response_1 = require("@/shared/response");
const config_1 = require("@/config");
const authService = new auth_service_1.AuthService();
function setTokenCookies(res, accessToken, refreshToken) {
    const base = {
        httpOnly: true,
        secure: config_1.config.cookie.secure,
        sameSite: config_1.config.cookie.sameSite,
        domain: config_1.config.cookie.domain,
    };
    res.cookie("accessToken", accessToken, { ...base, maxAge: 15 * 60 * 1000 });
    res.cookie("refreshToken", refreshToken, {
        ...base,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
}
function clearTokenCookies(res) {
    const base = {
        httpOnly: true,
        secure: config_1.config.cookie.secure,
        sameSite: config_1.config.cookie.sameSite,
        domain: config_1.config.cookie.domain,
    };
    res.clearCookie("accessToken", { ...base, path: "/" });
    res.clearCookie("refreshToken", { ...base, path: "/" });
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        setTokenCookies(res, result.accessToken, result.refreshToken);
        res.json((0, response_1.success)("Login successful", result.user));
    }
    catch (err) {
        res.status(401).json((0, response_1.error)(err.message));
    }
}
async function refresh(req, res) {
    try {
        const { refreshToken } = req.cookies;
        const result = await authService.refresh(refreshToken);
        setTokenCookies(res, result.accessToken, result.refreshToken);
        res.json((0, response_1.success)("Token refreshed"));
    }
    catch (err) {
        clearTokenCookies(res);
        res.status(401).json((0, response_1.error)(err.message));
    }
}
async function logout(req, res) {
    try {
        await authService.logout(req.user.id);
        clearTokenCookies(res);
        res.json((0, response_1.success)("Logged out"));
    }
    catch (err) {
        res.status(500).json((0, response_1.error)(err.message));
    }
}
async function me(req, res) {
    try {
        const user = await authService.getMe(req.user.id);
        res.json((0, response_1.success)("User retrieved", user));
    }
    catch (err) {
        res.status(404).json((0, response_1.error)(err.message));
    }
}
//# sourceMappingURL=auth.controller.js.map