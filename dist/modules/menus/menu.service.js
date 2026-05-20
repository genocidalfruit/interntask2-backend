"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const menu_model_1 = require("./menu.model");
const role_model_1 = require("@/modules/roles/role.model");
class MenuService {
    async getMenusForUser(userId, roleId) {
        const role = await role_model_1.Role.findById(roleId);
        if (!role)
            return [];
        const userPermissions = new Set(role.permissions);
        const allMenus = await menu_model_1.Menu.find().sort({ order: 1 });
        const menuMap = new Map();
        const rootMenus = [];
        for (const menu of allMenus) {
            const hasAccess = menu.permissions.length === 0 || menu.permissions.every((p) => userPermissions.has(p));
            if (!hasAccess)
                continue;
            const menuObj = {
                id: menu._id.toString(),
                label: menu.label,
                icon: menu.icon,
                path: menu.path,
                children: [],
            };
            menuMap.set(menuObj.id, menuObj);
            if (menu.parentId) {
                const parentId = menu.parentId.toString();
                const parent = menuMap.get(parentId);
                if (parent) {
                    parent.children.push(menuObj);
                }
            }
            else {
                rootMenus.push(menuObj);
            }
        }
        return rootMenus;
    }
    async getAll() {
        return menu_model_1.Menu.find().sort({ order: 1 });
    }
    async create(data) {
        return menu_model_1.Menu.create(data);
    }
    async update(id, data) {
        const menu = await menu_model_1.Menu.findByIdAndUpdate(id, data, { new: true });
        if (!menu)
            throw new Error("Menu not found");
        return menu;
    }
}
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map