import { Response } from "express";
import { UserService } from "./user.service";
import { success, error } from "@/shared/response";
import { AuthRequest } from "@/middleware/auth.middleware";
import { auditService } from "@/modules/audit/audit.service";

const userService = new UserService();

export async function getAll(req: AuthRequest, res: Response) {
  try {
    const users = await userService.getAll();
    res.json(success("Users retrieved", users));
  } catch (err: any) {
    res.status(500).json(error(err.message, undefined, req.id));
  }
}

export async function getById(req: AuthRequest, res: Response) {
  try {
    const user = await userService.getById(req.params.id);
    res.json(success("User retrieved", user));
  } catch (err: any) {
    res.status(404).json(error(err.message, undefined, req.id));
  }
}

export async function create(req: AuthRequest, res: Response) {
  try {
    const user = await userService.create(req.body);
    await auditService.log(req.user!.id, "User created", "User", user._id.toString(), undefined, req.body, req.id);
    res.status(201).json(success("User created", user));
  } catch (err: any) {
    res.status(400).json(error(err.message, undefined, req.id));
  }
}

export async function update(req: AuthRequest, res: Response) {
  try {
    const existingUser = await userService.getById(req.params.id);
    const user = await userService.update(req.params.id, req.body);
    await auditService.log(req.user!.id, "User updated", "User", user._id.toString(), existingUser, req.body, req.id);
    res.json(success("User updated", user));
  } catch (err: any) {
    res.status(400).json(error(err.message, undefined, req.id));
  }
}

export async function remove(req: AuthRequest, res: Response) {
  try {
    const { User } = await import("./user.model");
    const user = await User.findById(req.params.id);
    await User.findByIdAndDelete(req.params.id);
    await auditService.log(req.user!.id, "User deleted", "User", req.params.id, user?.toObject(), undefined, req.id);
    res.json(success("User deleted"));
  } catch (err: any) {
    res.status(500).json(error(err.message, undefined, req.id));
  }
}