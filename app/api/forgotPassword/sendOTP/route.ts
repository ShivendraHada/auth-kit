import { DBConnect } from "@/utils/DBConnect";
import { NextRequest, NextResponse } from "next/server";
import random from "random";
import User from "@/models/User";
import bcrypt from "bcrypt";
import sendMail from "@/utils/sendEmail";
import OTPEmailTemplate from "@/templates/OTPEmailTemplate";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Connect to the database
    await DBConnect();

    // Get the email from the request body
    const { email } = await req.json();

    // Check if the user exists
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return NextResponse.json(
        { message: "Email Address not registered!" },
        { status: 409 }
      );
    }

    // Generate a new OTP
    const OTP = random.int(100000, 999999);
    const hashedOTP = await bcrypt.hash(OTP.toString(), 10);

    // Prepare the email data
    const mailData = {
      from: "The Tech Hub <info@thetechhub.app>",
      to: user.email,
      subject: `Your OTP to change your password: ${user.name}`,
      text: `Your OTP to change your password: ${user.name}`,
      html: OTPEmailTemplate({ OTP }),
    };

    // Send the email
    const success = await sendMail(mailData);
    if (success) {
      return NextResponse.json(
        { message: "OTP Sent!", hashedOTP },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    // Handle any errors
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
