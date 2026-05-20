import { Response } from "express";
import { auditService } from "./audit.service";
import { success, error } from "@/shared/response";
import { AuthRequest } from "@/middleware/auth.middleware";

export async function getAll(req: AuthRequest, res: Response) {
  try {
    const { logs, meta } = await auditService.getAll(req.query);
    res.json(success("Audit logs retrieved", logs, meta));
  } catch (err: any) {
    res.status(500).json(error(err.message, undefined, req.id));
  }
}