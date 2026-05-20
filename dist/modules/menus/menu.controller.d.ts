import { Response } from "express";
import { AuthRequest } from "@/middleware/auth.middleware";
export declare function getMyMenus(req: AuthRequest, res: Response): Promise<void>;
export declare function getAll(req: AuthRequest, res: Response): Promise<void>;
export declare function create(req: AuthRequest, res: Response): Promise<void>;
export declare function update(req: AuthRequest, res: Response): Promise<void>;
