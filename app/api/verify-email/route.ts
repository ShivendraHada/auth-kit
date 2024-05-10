import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import DBConnect from "@/utils/DBConnect";
import User from "@/models/User";
import getEnv from "@/utils/envConfig";
import sendConfirmationEmail from "@/utils/sendConfirmationEmail";

export async function POST(request: NextRequest) {
  try {
    const { BASE_URL } = getEnv();
    const { email } = await request.json();

    await DBConnect();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { status, name } = user;

    switch (status) {
      case "NotConfirmed":
        const newConfirmationCode = nanoid(12);
        const confirmationLink = new URL(
          `${BASE_URL}/api/confirm-email?email=${email}&code=${newConfirmationCode}`
        );
        await user.updateOne({ confirmationCode: newConfirmationCode });
        await sendConfirmationEmail({
          email,
          confirmationLink,
          userName: name.split(" ")[0],
        });
        return NextResponse.json(
          { message: "Verification email sent! Please verify email address." },
          { status: 401 }
        );

      case "Inactive":
        return NextResponse.json(
          { error: "Your account is currently inactive" },
          { status: 403 }
        );

      case "Disabled":
        return NextResponse.json(
          { error: "Your account has been disabled" },
          { status: 403 }
        );

      case "Active":
        return NextResponse.json(
          { message: "Email already verified" },
          { status: 200 }
        );

      default:
        return NextResponse.json(
          { error: "Invalid user status" },
          { status: 500 }
        );
    }
  } catch (error) {
    console.error("Error in POST /verify-email:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
