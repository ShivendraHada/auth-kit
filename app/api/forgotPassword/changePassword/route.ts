import User from "@/models/User";
import { DBConnect } from "@/utils/DBConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    // Get the data from the request body
    const { emailAddress, otp, hashOTP, password } = await req.json();

    // Connect to the database
    await DBConnect();

    // Find the user by email
    const user = await User.findOne({ email: emailAddress });
    if (!user) {
      return NextResponse.json(
        { message: "Email Address not registered!" },
        { status: 409 }
      );
    }

    // Verify the OTP
    const isValid = await bcrypt.compare(otp, hashOTP);
    if (!isValid) {
      return NextResponse.json({ message: "Invalid OTP!" }, { status: 409 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    await user.updateOne({ password: hashedPassword });

    // Return a success response
    return NextResponse.json(
      { message: "Password Changed Successful!" },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle any errors
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
