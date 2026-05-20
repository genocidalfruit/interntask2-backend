import { NextFunction, Response } from "express";
import { AuthRequest } from "@/middleware/auth.middleware";
import { User } from "@/modules/users/user.model";

function hasPerm(permissions: string[], perm: string) {
  return permissions.includes(perm);
}

async function getUserPermissions(userId: string): Promise<string[]> {
  const user = await User.findById(userId).populate("roleId", "permissions");
  if (!user || !(user as any).roleId) return [];
  return ((user as any).roleId as any).permissions || [];
}

export function scopeTickets(req: AuthRequest, _res: Response, next: NextFunction) {
  (async () => {
    if (!req.user?.id) return next();
    const perms = await getUserPermissions(req.user.id);

    const isEmployee =
      !hasPerm(perms, "ticket.update") &&
      !hasPerm(perms, "audit.view") &&
      !hasPerm(perms, "report.view");

    if (isEmployee) {
      req.query.scope = "mine";
    }

    next();
  })().catch(next);
}

export function scopeAssets(req: AuthRequest, _res: Response, next: NextFunction) {
  (async () => {
    if (!req.user?.id) return next();
    const perms = await getUserPermissions(req.user.id);

    const isEmployee =
      !hasPerm(perms, "audit.view") &&
      !hasPerm(perms, "report.view") &&
      !hasPerm(perms, "asset.update") &&
      !hasPerm(perms, "asset.assign");

    if (isEmployee) {
      req.query.scope = "assigned";
    }

    next();
  })().catch(next);
}
