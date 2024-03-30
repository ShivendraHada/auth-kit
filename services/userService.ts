import { DBConnect } from "@/utils/DBConnect";
import UserModel, { IUser } from "@/models/UserModel";
import bcrypt from "bcrypt";

export const userService = {
  authenticate,
};

async function authenticate(
  username: string,
  password: string
): Promise<IUser | null> {
  try {
    await DBConnect();
    const user = await UserModel.findOne({ email: username });
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("User service error:", error);
    return null;
  }
}
