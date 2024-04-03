import { DBConnect } from "@/lib/DBConnect";
import UserModel, { IUser } from "@/models/User";
import bcrypt from "bcrypt";

export async function authenticateUser(
  username: string,
  password: string
): Promise<IUser | null> {
  try {
    await DBConnect();
    const user = await UserModel.findOne({ email: username });
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    return user;
  } catch (error) {
    console.error("User service error:", error);
    return null;
  }
}
