import { Role, IRole } from "./role.model";

export class RoleService {
  async getAll() {
    return Role.find();
  }

  async getById(id: string) {
    const role = await Role.findById(id);
    if (!role) throw new Error("Role not found");
    return role;
  }

  async create(data: Partial<IRole>) {
    const role = await Role.create(data);
    return role;
  }

  async update(id: string, data: Partial<IRole>) {
    const role = await Role.findByIdAndUpdate(id, data, { new: true });
    if (!role) throw new Error("Role not found");
    return role;
  }
}