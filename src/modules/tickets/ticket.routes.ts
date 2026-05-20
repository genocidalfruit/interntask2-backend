import { Router } from "express";
import { getAll, getById, create, update, assign, changeStatus, addComment, remove } from "./ticket.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";
import { scopeTickets } from "@/middleware/scope.middleware";
import { Permission } from "@/shared/enums/permissions";

const router = Router();

router.get("/", authMiddleware, requirePermission(Permission.TICKET_VIEW), scopeTickets, getAll);
router.post("/", authMiddleware, requirePermission(Permission.TICKET_CREATE), create);
router.get("/:id", authMiddleware, requirePermission(Permission.TICKET_VIEW), getById);
router.patch("/:id", authMiddleware, requirePermission(Permission.TICKET_UPDATE), update);
router.post("/:id/assign", authMiddleware, requirePermission(Permission.TICKET_ASSIGN), assign);
router.post("/:id/status", authMiddleware, requirePermission(Permission.TICKET_UPDATE), changeStatus);
router.post("/:id/comments", authMiddleware, requirePermission(Permission.TICKET_UPDATE), addComment);
router.delete("/:id", authMiddleware, requirePermission(Permission.TICKET_UPDATE), remove);

export default router;