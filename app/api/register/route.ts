import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import DBConnect from "@/utils/DBConnect";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  await DBConnect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists!" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return NextResponse.json({ message: "User registered successfully" });
}
