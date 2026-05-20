import { Response, NextFunction } from "express";
import { AuthRequest } from "@/middleware/auth.middleware";
import { error } from "@/shared/response";
import { Role } from "@/modules/roles/role.model";

export function requirePermission(...permissions: string[]) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const role = await Role.findById(req.user!.roleId);
      if (!role) {
        return res.status(403).json(error("Forbidden", undefined, req.id));
      }

      const hasAll = permissions.every((p) => role.permissions.includes(p));
      if (!hasAll) {
        return res.status(403).json(error("Forbidden", undefined, req.id));
      }

      next();
    } catch {
      return res.status(500).json(error("Internal server error", undefined, req.id));
    }
  };
}