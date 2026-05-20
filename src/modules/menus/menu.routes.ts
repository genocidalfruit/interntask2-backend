import { Router } from "express";
import { getMyMenus, getAll, create, update } from "./menu.controller";
import { authMiddleware } from "@/middleware/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, getMyMenus);
router.get("/", authMiddleware, getAll);
router.post("/", authMiddleware, create);
router.patch("/:id", authMiddleware, update);

export default router;