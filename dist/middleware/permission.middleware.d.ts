import { Response, NextFunction } from "express";
import { AuthRequest } from "@/middleware/auth.middleware";
export declare function requirePermission(...permissions: string[]): (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
