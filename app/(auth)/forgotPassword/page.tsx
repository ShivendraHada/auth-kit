"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/modals/AuthModal";
import InputBox from "@/components/elements/Input";
import SubmitButton from "@/components/elements/Button";

export default function ForgotPassword() {
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const name = e.target["name"].value;
  };

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  return (
    <AuthModal heading="Forgot Password" subHeading="Enter your email address:">
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
