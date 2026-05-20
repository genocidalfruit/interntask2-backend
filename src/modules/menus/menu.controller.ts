import { Response } from "express";
import { MenuService } from "./menu.service";
import { success, error } from "@/shared/response";
import { AuthRequest } from "@/middleware/auth.middleware";

const menuService = new MenuService();

export async function getMyMenus(req: AuthRequest, res: Response) {
  try {
    const menus = await menuService.getMenusForUser(req.user!.id, req.user!.roleId);
    res.json(success("Menus retrieved", menus));
  } catch (err: any) {
    res.status(500).json(error(err.message, undefined, req.id));
  }
}

export async function getAll(req: AuthRequest, res: Response) {
  try {
    const menus = await menuService.getAll();
    res.json(success("Menus retrieved", menus));
  } catch (err: any) {
    res.status(500).json(error(err.message, undefined, req.id));
  }
}

export async function create(req: AuthRequest, res: Response) {
  try {
    const menu = await menuService.create(req.body);
    res.status(201).json(success("Menu created", menu));
  } catch (err: any) {
    res.status(400).json(error(err.message, undefined, req.id));
  }
}

export async function update(req: AuthRequest, res: Response) {
  try {
    const menu = await menuService.update(req.params.id, req.body);
    res.json(success("Menu updated", menu));
  } catch (err: any) {
    res.status(400).json(error(err.message, undefined, req.id));
  }
}