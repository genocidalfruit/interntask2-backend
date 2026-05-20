import { Response } from "express";
import { RoleService } from "./role.service";
import { success, error } from "@/shared/response";
import { AuthRequest } from "@/middleware/auth.middleware";
import { auditService } from "@/modules/audit/audit.service";

const roleService = new RoleService();

export async function getAll(req: AuthRequest, res: Response) {
  try {
    const roles = await roleService.getAll();
    res.json(success("Roles retrieved", roles));
  } catch (err: any) {
    res.status(500).json(error(err.message, undefined, req.id));
  }
}

export async function create(req: AuthRequest, res: Response) {
  try {
    const role = await roleService.create(req.body);
    await auditService.log(req.user!.id, "Role created", "Role", role._id.toString(), undefined, req.body, req.id);
    res.status(201).json(success("Role created", role));
  } catch (err: any) {
    res.status(400).json(error(err.message, undefined, req.id));
  }
}

export async function update(req: AuthRequest, res: Response) {
  try {
    const existingRole = await roleService.getAll().then(r => r.find(r => r._id === req.params.id));
    const role = await roleService.update(req.params.id, req.body);
    await auditService.log(req.user!.id, "Role updated", "Role", role._id.toString(), existingRole, req.body, req.id);
    res.json(success("Role updated", role));
  } catch (err: any) {
    res.status(400).json(error(err.message, undefined, req.id));
  }
}

export async function remove(req: AuthRequest, res: Response) {
  try {
    const { Role } = await import("./role.model");
    const role = await Role.findById(req.params.id);
    await Role.findByIdAndDelete(req.params.id);
    await auditService.log(req.user!.id, "Role deleted", "Role", req.params.id, role?.toObject(), undefined, req.id);
    res.json(success("Role deleted"));
  } catch (err: any) {
    res.status(500).json(error(err.message, undefined, req.id));
  }
}