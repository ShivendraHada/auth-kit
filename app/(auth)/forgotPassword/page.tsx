"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/modals/AuthModal";
import InputBox from "@/components/elements/Input";
import SubmitButton from "@/components/elements/Button";

export default function ForgotPassword() {
  const [showSendOTP, setShowSendOTP] = useState<boolean>(true);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSendOTPSubmit = (e: any) => {
    e.preventDefault();
    setShowSendOTP(false);
    const data = new FormData(e.target);
  };
  const handleForgotPasswordSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
  };

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  return (
    <AuthModal heading="Forgot Password">
      <form
        method="POST"
        className={`flex flex-col py-1 ${showSendOTP ? "block" : "hidden"}`}
        onSubmit={handleSendOTPSubmit}
      >
        <InputBox type="email" name="email" placeholder="Email Address" />
        <SubmitButton text={"Send OTP"} />
      </form>
      <form
        method="POST"
        className={`flex flex-col py-1 ${showSendOTP ? "hidden" : "block"}`}
        onSubmit={handleForgotPasswordSubmit}
      >
        <div>
          <InputBox type="text" name="otp" placeholder="Enter OTP" />
        </div>
        <div>
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
        <SubmitButton text={"Submit OTP"} />
        <div className="text-center text-xs">
          <a href="/login" className="hover:text-green-400">
            Login
          </a>{" "}
          |{" "}
          <a href="/register" className="hover:text-red-400">
            Register
          </a>
        </div>
      </form>
    </AuthModal>
  );
}
