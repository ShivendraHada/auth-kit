import User from "@/models/User";
import DBConnect from "@/utils/DBConnect";
import getEnv from "@/utils/envConfig";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const confirmationCode = request.nextUrl.searchParams.get("code");
  const email = request.nextUrl.searchParams.get("email");

  const { BASE_URL } = getEnv();
  if (!confirmationCode || !email) {
    return NextResponse.redirect("/");
  }

  try {
    // Connect to the database
    await DBConnect();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    if (user.confirmationCode !== confirmationCode) {
      return NextResponse.json(
        { error: "Invalid confirmation code!" },
        { status: 400 }
      );
    }

    await user.updateOne({ status: "Active", $unset: { confirmationCode } });

    await user.update;

    const redirectUrl = `${BASE_URL}/login?confirmedEmail=true`;

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    const redirectUrl = `${BASE_URL}/login?confirmedEmail=true`;
    return NextResponse.redirect(redirectUrl);
  }
}
