import { NextFunction, Response } from "express";
import { AuthRequest } from "@/middleware/auth.middleware";
export declare function scopeTickets(req: AuthRequest, _res: Response, next: NextFunction): void;
export declare function scopeAssets(req: AuthRequest, _res: Response, next: NextFunction): void;
