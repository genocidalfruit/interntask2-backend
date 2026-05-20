import { Request, Response, NextFunction } from "express";
import { DecodedToken } from "@/shared/types";
export interface AuthRequest extends Request {
    user?: DecodedToken & {
        id: string;
    };
}
export declare function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
