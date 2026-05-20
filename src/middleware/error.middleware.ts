import { Request, Response, NextFunction } from "express";
import { error } from "@/shared/response";

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error(err.stack);
  const traceId = (res as Response & { id?: string }).id;
  res.status(500).json(error("Internal server error", undefined, traceId));
}