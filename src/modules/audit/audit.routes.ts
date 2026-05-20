import { Router } from "express";
import { getAll } from "./audit.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";
import { Permission } from "@/shared/enums/permissions";

const router = Router();

router.get("/", authMiddleware, requirePermission(Permission.AUDIT_VIEW), getAll);

export default router;