import { Response } from "express";
import { AuthRequest } from "@/middleware/auth.middleware";
export declare function getAll(req: AuthRequest, res: Response): Promise<void>;
