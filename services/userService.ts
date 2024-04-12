import { DBConnect } from "@/utils/DBConnect";
import UserModel, { IUser } from "@/models/User";
import bcrypt from "bcrypt";

export async function authenticateUser(
  username: string,
  password: string
): Promise<IUser | null> {
  try {
    // Connect to the database
    await DBConnect();

    // Find the user by email
    const user = await UserModel.findOne({ email: username });
    if (!user) {
      return null;
    }

    // Verify the password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }

    // Return the user
    return user;
  } catch (error) {
    // Handle any errors
    console.error("User service error:", error);
    return null;
  }
}
