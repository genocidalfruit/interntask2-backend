import { CookieOptions, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { success, error } from "@/shared/response";
import { config } from "@/config";
import { AuthRequest } from "@/middleware/auth.middleware";

const authService = new AuthService();

function setTokenCookies(
  res: Response,
  accessToken: string,
  refreshToken: string,
) {
  const base: CookieOptions = {
    httpOnly: true,
    secure: config.cookie.secure,
    sameSite: config.cookie.sameSite,
    path: "/",
    ...(config.cookie.domain ? { domain: config.cookie.domain } : {}),
  };
  if (!config.cookie.domain) {
    const legacyLocalhostBase = { ...base, domain: "localhost" };
    res.clearCookie("accessToken", legacyLocalhostBase);
    res.clearCookie("refreshToken", legacyLocalhostBase);
  }
  res.cookie("accessToken", accessToken, { ...base, maxAge: 15 * 60 * 1000 });
  res.cookie("refreshToken", refreshToken, {
    ...base,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

function clearTokenCookies(res: Response) {
  const base: CookieOptions = {
    httpOnly: true,
    secure: config.cookie.secure,
    sameSite: config.cookie.sameSite,
    path: "/",
    ...(config.cookie.domain ? { domain: config.cookie.domain } : {}),
  };
  res.clearCookie("accessToken", base);
  res.clearCookie("refreshToken", base);
  if (!config.cookie.domain) {
    const legacyLocalhostBase = { ...base, domain: "localhost" };
    res.clearCookie("accessToken", legacyLocalhostBase);
    res.clearCookie("refreshToken", legacyLocalhostBase);
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    setTokenCookies(res, result.accessToken, result.refreshToken);
    res.json(success("Login successful", result.user));
  } catch (err: any) {
    res.status(401).json(error(err.message));
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    const { refreshToken } = req.cookies;
    const result = await authService.refresh(refreshToken);
    setTokenCookies(res, result.accessToken, result.refreshToken);
    res.json(success("Token refreshed"));
  } catch (err: any) {
    clearTokenCookies(res);
    res.status(401).json(error(err.message));
  }
}

export async function logout(req: AuthRequest, res: Response) {
  try {
    await authService.logout(req.user!.id);
    clearTokenCookies(res);
    res.json(success("Logged out"));
  } catch (err: any) {
    res.status(500).json(error(err.message));
  }
}

export async function me(req: AuthRequest, res: Response) {
  try {
    const user = await authService.getMe(req.user!.id);
    res.json(success("User retrieved", user));
  } catch (err: any) {
    res.status(404).json(error(err.message));
  }
}
