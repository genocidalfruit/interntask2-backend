import { Response } from "express";
import { AuthRequest } from "@/middleware/auth.middleware";
export declare function getMyNotifications(req: AuthRequest, res: Response): Promise<void>;
export declare function markRead(req: AuthRequest, res: Response): Promise<void>;
