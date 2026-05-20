import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "@/config";
import { error } from "@/shared/response";
import { DecodedToken } from "@/shared/types";
import { User } from "@/modules/users/user.model";

export interface AuthRequest extends Request {
  user?: DecodedToken & { id: string };
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json(error("Unauthorized", undefined, req.id));
    }

    const decoded = jwt.verify(token, config.jwt.secret) as DecodedToken;
    const user = await User.findById(decoded.userId).select("status");

    if (!user || user.status !== "ACTIVE") {
      return res.status(401).json(error("Unauthorized", undefined, req.id));
    }

    req.user = { ...decoded, id: decoded.userId };
    next();
  } catch {
    return res.status(401).json(error("Unauthorized", undefined, req.id));
  }
}