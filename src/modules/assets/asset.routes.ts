import { Router } from "express";
import { getAll, getById, create, update, assign, changeStatus, getHistory, remove } from "./asset.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { requirePermission } from "@/middleware/permission.middleware";
import { scopeAssets } from "@/middleware/scope.middleware";
import { Permission } from "@/shared/enums/permissions";

const router = Router();

router.get("/", authMiddleware, requirePermission(Permission.ASSET_VIEW), scopeAssets, getAll);
router.post("/", authMiddleware, requirePermission(Permission.ASSET_CREATE), create);
router.get("/:id", authMiddleware, requirePermission(Permission.ASSET_VIEW), getById);
router.patch("/:id", authMiddleware, requirePermission(Permission.ASSET_UPDATE), update);
router.post("/:id/assign", authMiddleware, requirePermission(Permission.ASSET_ASSIGN), assign);
router.post("/:id/status", authMiddleware, requirePermission(Permission.ASSET_UPDATE), changeStatus);
router.get("/:id/history", authMiddleware, requirePermission(Permission.ASSET_VIEW), getHistory);
router.delete("/:id", authMiddleware, requirePermission(Permission.ASSET_UPDATE), remove);

export default router;