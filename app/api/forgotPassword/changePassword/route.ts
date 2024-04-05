import User from "@/models/User";
import { DBConnect } from "@/lib/DBConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { emailAddress, otp, hashOTP, password } = await req.json();

    // Verify the OTP
    const isValid = await bcrypt.compare(otp, hashOTP);
    if (!isValid) {
      return NextResponse.json({ message: "Invalid OTP!" }, { status: 409 });
    }

    // Connect to the database
    await DBConnect();

    // Find the user by email
    const userData = await User.findOne({ email: emailAddress });
    if (!userData) {
      return NextResponse.json(
        { message: "Email Address not registered!" },
        { status: 409 }
      );
    }

    // Update the user's password
    await userData.updateOne({ password });

    return NextResponse.json(
      { message: "Password Changed Successful!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
