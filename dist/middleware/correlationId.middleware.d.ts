import { Request, Response, NextFunction } from "express";
export declare function correlationIdMiddleware(req: Request, res: Response, next: NextFunction): void;
declare global {
    namespace Express {
        interface Request {
            id?: string;
        }
    }
}
