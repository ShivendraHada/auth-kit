"use client";

import SubmitButton from "@/components/elements/button";
import Heading from "@/components/elements/heading";
import InputBox from "@/components/elements/input";
import { useState } from "react";

export default function ForgotPassword() {
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const name = e.target["name"].value;
  };

  return (
    <main className="flex min-h-screen max-w-sm m-auto items-center">
      <div className="flex flex-col justify-center md:w-full w-[95%] mx-auto bg-[#ffffffe3] shadow-lg md:px-3 md:py-6 rounded-lg p-2">
        <Heading text="Forgot Password" />
        <form className="flex flex-col py-1" onSubmit={handleSubmit}>
          <InputBox type="email" name="email" placeholder="Email Address" />
          <div className={showOTP ? "block" : "hidden"}>
            <InputBox type="text" name="otp" placeholder="Enter OTP" />
          </div>
          <div className={showNewPassword ? "block" : "hidden"}>
            <InputBox
              type="password"
              name="password"
              placeholder="New Password"
            />
            <InputBox
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
          <SubmitButton
            text={
              showOTP ? "Submit OTP" : showNewPassword ? "Submit" : "Send OTP"
            }
          />
          <div className="text-center text-xs">
            <a href="/auth/login" className="hover:text-green-400">
              Login
            </a>{" "}
            |{" "}
            <a href="/auth/register" className="hover:text-red-400">
              Register
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
