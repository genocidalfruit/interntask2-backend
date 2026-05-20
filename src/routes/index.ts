import { Router } from "express";
import authRoutes from "@/modules/auth/auth.routes";
import assetRoutes from "@/modules/assets/asset.routes";
import ticketRoutes from "@/modules/tickets/ticket.routes";
import userRoutes from "@/modules/users/user.routes";
import roleRoutes from "@/modules/roles/role.routes";
import menuRoutes from "@/modules/menus/menu.routes";
import auditRoutes from "@/modules/audit/audit.routes";
import notificationRoutes from "@/modules/notifications/notification.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/assets", assetRoutes);
router.use("/tickets", ticketRoutes);
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/menus", menuRoutes);
router.use("/audit-logs", auditRoutes);
router.use("/notifications", notificationRoutes);

router.get("/health", (_req, res) => {
  res.json({ success: true, message: "OK", data: { status: "healthy", timestamp: new Date().toISOString() } });
});

export default router;