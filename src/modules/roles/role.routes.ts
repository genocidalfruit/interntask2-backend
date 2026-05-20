import { Router } from "express";
import { getAll, create, update, remove } from "./role.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";
import { Permission } from "@/shared/enums/permissions";

const router = Router();

router.get("/", authMiddleware, requirePermission(Permission.ROLE_MANAGE), getAll);
router.post("/", authMiddleware, requirePermission(Permission.ROLE_MANAGE), create);
router.patch("/:id", authMiddleware, requirePermission(Permission.ROLE_MANAGE), update);
router.delete("/:id", authMiddleware, requirePermission(Permission.ROLE_MANAGE), remove);

export default router;