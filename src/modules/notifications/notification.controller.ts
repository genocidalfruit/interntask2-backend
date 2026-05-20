import { Response } from "express";
import { notificationService } from "./notification.service";
import { success, error } from "@/shared/response";
import { AuthRequest } from "@/middleware/auth.middleware";

export async function getMyNotifications(req: AuthRequest, res: Response) {
  try {
    const readParam = req.query.read;
    const read = readParam === "true" ? true : readParam === "false" ? false : undefined;
    const notifications = await notificationService.getMyNotifications(req.user!.id, read);
    res.json(success("Notifications retrieved", notifications));
  } catch (err: any) {
    res.status(500).json(error(err.message, undefined, req.id));
  }
}

export async function markRead(req: AuthRequest, res: Response) {
  try {
    const notification = await notificationService.markRead(req.params.id, req.user!.id);
    res.json(success("Notification marked as read", notification));
  } catch (err: any) {
    res.status(404).json(error(err.message, undefined, req.id));
  }
}