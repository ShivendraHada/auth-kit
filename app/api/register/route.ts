import User from "@/models/UserModel";
import { DBConnect } from "@/utils/DBConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    await DBConnect();
    const { name, email, password } = await req.json();
    const exists = await User.findOne({ email }).exec();
    if (exists) {
      return NextResponse.json(
        { message: "Email already exists!" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    return NextResponse.json(
      { message: "User Registered Successfully!" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
