import { DBConnect } from "@/lib/DBConnect";
import otpMailTemplate from "@/lib/templates/otp-email-template";
import { NextRequest, NextResponse } from "next/server";
import random from "random";
import User, { IUser } from "@/models/User";
import Handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await DBConnect();
    const { email } = await req.json();
    const userData = await User.findOne({ email }).exec();
    if (!userData) {
      return NextResponse.json(
        { message: "Email Address not registered!" },
        { status: 409 }
      );
    }

    const otp = random.int(100000, 999999);
    const hashedOTP = await bcrypt.hash(otp.toString(), 10);

    const transporter: Transporter = await getTransporter();
    const mailData = getMailData(userData, otp);

    if (await sendMail(mailData, transporter)) {
      return NextResponse.json(
        { message: "OTP Sent!", hashedOTP },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

async function getTransporter(): Promise<Transporter> {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true,
  });

  await transporter.verify();
  return transporter;
}

function getMailData(userData: IUser, otp: number): any {
  const userTemplate = Handlebars.compile(otpMailTemplate);
  return {
    from: "The Tech Hub <info@thetechhub.app>",
    to: userData.email,
    subject: `Your OTP to change your password: ${userData.name}`,
    text: `Your OTP to change your password: ${userData.name}`,
    html: userTemplate({ OTP: otp }),
  };
}

async function sendMail(
  mailData: any,
  transporter: Transporter
): Promise<boolean> {
  try {
    await transporter.sendMail(mailData);
    return true;
  } catch (err) {
    console.error("Error sending mail: ", err);
    return false;
  }
}
