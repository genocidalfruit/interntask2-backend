"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyMenus = getMyMenus;
exports.getAll = getAll;
exports.create = create;
exports.update = update;
const menu_service_1 = require("./menu.service");
const response_1 = require("@/shared/response");
const menuService = new menu_service_1.MenuService();
async function getMyMenus(req, res) {
    try {
        const menus = await menuService.getMenusForUser(req.user.id, req.user.roleId);
        res.json((0, response_1.success)("Menus retrieved", menus));
    }
    catch (err) {
        res.status(500).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function getAll(req, res) {
    try {
        const menus = await menuService.getAll();
        res.json((0, response_1.success)("Menus retrieved", menus));
    }
    catch (err) {
        res.status(500).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function create(req, res) {
    try {
        const menu = await menuService.create(req.body);
        res.status(201).json((0, response_1.success)("Menu created", menu));
    }
    catch (err) {
        res.status(400).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
async function update(req, res) {
    try {
        const menu = await menuService.update(req.params.id, req.body);
        res.json((0, response_1.success)("Menu updated", menu));
    }
    catch (err) {
        res.status(400).json((0, response_1.error)(err.message, undefined, req.id));
    }
}
//# sourceMappingURL=menu.controller.js.map