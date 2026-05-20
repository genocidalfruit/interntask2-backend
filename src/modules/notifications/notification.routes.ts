import { Router } from "express";
import { getMyNotifications, markRead } from "./notification.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";
import { Permission } from "@/shared/enums/permissions";

const router = Router();

router.get("/me", authMiddleware, requirePermission(Permission.NOTIFICATION_VIEW), getMyNotifications);
router.patch("/:id/read", authMiddleware, requirePermission(Permission.NOTIFICATION_VIEW), markRead);

export default router;