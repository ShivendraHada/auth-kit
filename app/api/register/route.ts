import User from "@/models/User";
import DBConnect from "@/utils/DBConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await DBConnect();

    // Get the user data from the request body
    const { name, email, password } = await req.json();

    // Check if the email already exists
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists!" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await User.create({ name, email, password: hashedPassword });

    // Return a success response
    return NextResponse.json(
      { message: "Registration Successful!" },
      { status: 201 }
    );
  } catch (error: any) {
    // Handle any errors
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
