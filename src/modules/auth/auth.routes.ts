import { Router } from "express";
import { login, refresh, logout, me } from "./auth.controller";
import { authMiddleware } from "@/middleware/auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, me);

export default router;