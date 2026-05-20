import { Router } from "express";
import { getAll, getById, create, update, remove } from "./user.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";
import { Permission } from "@/shared/enums/permissions";

const router = Router();

router.get("/", authMiddleware, requirePermission(Permission.USER_VIEW), getAll);
router.post("/", authMiddleware, requirePermission(Permission.USER_MANAGE), create);
router.get("/:id", authMiddleware, requirePermission(Permission.USER_VIEW), getById);
router.patch("/:id", authMiddleware, requirePermission(Permission.USER_MANAGE), update);
router.delete("/:id", authMiddleware, requirePermission(Permission.USER_MANAGE), remove);

export default router;