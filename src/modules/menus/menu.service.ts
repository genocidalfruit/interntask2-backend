import { Menu } from "./menu.model";
import { Role } from "@/modules/roles/role.model";

export class MenuService {
  async getMenusForUser(userId: string, roleId: string) {
    const role = await Role.findById(roleId);
    if (!role) return [];

    const userPermissions = new Set(role.permissions);
    const allMenus = await Menu.find().sort({ order: 1 });

    const menuMap = new Map<string, any>();
    const rootMenus: any[] = [];

    for (const menu of allMenus) {
      const hasAccess = menu.permissions.length === 0 || menu.permissions.every((p: string) => userPermissions.has(p));
      if (!hasAccess) continue;

      const menuObj = {
        id: (menu._id as any).toString(),
        label: menu.label,
        icon: menu.icon,
        path: menu.path,
        children: [],
      };

      menuMap.set(menuObj.id, menuObj);

      if (menu.parentId) {
        const parentId = (menu.parentId as any).toString();
        const parent = menuMap.get(parentId);
        if (parent) {
          parent.children.push(menuObj);
        }
      } else {
        rootMenus.push(menuObj);
      }
    }

    return rootMenus;
  }

  async getAll() {
    return Menu.find().sort({ order: 1 });
  }

  async create(data: any) {
    return Menu.create(data);
  }

  async update(id: string, data: any) {
    const menu = await Menu.findByIdAndUpdate(id, data, { new: true });
    if (!menu) throw new Error("Menu not found");
    return menu;
  }
}