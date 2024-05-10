import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import DBConnect from "@/utils/DBConnect";
import User from "@/models/User";
import getEnv from "@/utils/envConfig";
import sendConfirmationEmail from "@/utils/sendConfirmationEmail";
import { signIn } from "next-auth/react";

export async function POST(request: NextRequest) {
  try {
    const { BASE_URL } = getEnv();
    const { email, password } = await request.json();

    await DBConnect();

    const userData = await User.findOne({ email });

    const { status, name } = userData;

    switch (status) {
      case "NotConfirmed":
        const newConfirmationCode = nanoid(12);
        const confirmationLink = new URL(
          `${BASE_URL}/api/confirm-email?email=${email}&code=${newConfirmationCode}`
        );
        await userData.updateOne({ confirmationCode: newConfirmationCode });
        await sendConfirmationEmail({
          email,
          confirmationLink,
          userName: name.split(" ")[0],
        });
        return NextResponse.json(
          {
            error:
              "Verification Email Sent, Please verify your email address first!",
          },
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
          { status: 401 }
        );

      case "Active":
        return NextResponse.json({ message: "Verified" }, { status: 200 });

      default:
        return NextResponse.json(
          { error: "Error fetching data!" },
          { status: 500 }
        );
    }
  } catch (error) {
    console.error("Error in POST /register:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
