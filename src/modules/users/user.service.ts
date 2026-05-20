import bcrypt from "bcryptjs";
import { User, IUser } from "./user.model";
import { UserStatus } from "@/shared/enums";

export class UserService {
  async getAll() {
    return User.find().populate("roleId", "name");
  }

  async getById(id: string) {
    const user = await User.findById(id).populate("roleId", "name permissions");
    if (!user) throw new Error("User not found");
    return user;
  }

  async create(data: Partial<IUser> & { password: string }) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const { password, ...rest } = data;
    const user = await User.create({ ...rest, passwordHash });
    return user;
  }

  async update(id: string, data: Partial<IUser>) {
    if (data.status && !Object.values(UserStatus).includes(data.status)) {
      throw new Error("Invalid status");
    }
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    if (!user) throw new Error("User not found");
    return user;
  }
}