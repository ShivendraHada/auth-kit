// app/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import DBConnect from "@/utils/DBConnect";
import User from "@/models/User";
import getEnv from "@/utils/envConfig";
import sendConfirmationEmail from "@/utils/sendConfirmationEmail";

export async function POST(request: Request) {
  try {
    const { BASE_URL } = getEnv();
    const { name, email, password } = await request.json();

    await DBConnect();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.status === "NotConfirmed") {
        const hashedPassword = await bcrypt.hash(password, 10);
        await existingUser.updateOne({ password: hashedPassword });
        await existingUser.save();
        return NextResponse.json(
          { message: "Please verify your email!" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { data: existingUser, error: "User already exists!" },
          { status: 400 }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmationCode = nanoid(12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      confirmationCode,
    });

    await newUser.save();

    const success = await sendConfirmationEmail({
      email,
      confirmationLink: new URL(
        `${BASE_URL}/api/confirm-email?email=${email}&code=${confirmationCode}`
      ),
      userName: name.split(" ")[0],
    });

    if (success) {
      return NextResponse.json(
        { message: "Please verify your email!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Something went wrong!" },
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
