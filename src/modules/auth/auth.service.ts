import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "@/config";
import { User } from "@/modules/users/user.model";
import { DecodedToken } from "@/shared/types";

export class AuthService {
  async login(email: string, password: string) {
    const user = await User.findOne({ email }).populate("roleId");
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error("Invalid credentials");

    if (user.status !== "ACTIVE") throw new Error("Account is not active");

    const roleId = user.roleId instanceof Object ? (user.roleId as any)._id.toString() : (user.roleId as any).toString();

    const payload: DecodedToken = {
      userId: (user._id as any).toString(),
      email: user.email,
      roleId,
    };

    const accessToken = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
    const refreshToken = jwt.sign(payload, config.refreshToken.secret, { expiresIn: config.refreshToken.expiresIn });

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email, roleId: user.roleId } };
  }

  async refresh(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, config.refreshToken.secret) as DecodedToken;
      const user = await User.findById(decoded.userId);

      if (!user || user.refreshToken !== refreshToken) {
        throw new Error("Invalid refresh token");
      }

      const roleId = user.roleId instanceof Object ? (user.roleId as any)._id.toString() : (user.roleId as any).toString();

      const payload: DecodedToken = {
        userId: (user._id as any).toString(),
        email: user.email,
        roleId,
      };

      const newAccessToken = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
      const newRefreshToken = jwt.sign(payload, config.refreshToken.secret, { expiresIn: config.refreshToken.expiresIn });

      user.refreshToken = newRefreshToken;
      await user.save();

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch {
      throw new Error("Invalid refresh token");
    }
  }

  async logout(userId: string) {
    await User.findByIdAndUpdate(userId, { refreshToken: null });
  }

  async getMe(userId: string) {
    const user = await User.findById(userId).populate("roleId", "name permissions");
    if (!user) throw new Error("User not found");
    return { id: user._id, name: user.name, email: user.email, role: user.roleId, status: user.status };
  }
}