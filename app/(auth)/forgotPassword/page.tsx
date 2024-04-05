"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/modals/AuthModal";
import InputBox from "@/components/elements/Input";
import SubmitButton from "@/components/elements/Button";
import { toast } from "react-toastify";

const SendOTPForm = ({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col py-1">
      <InputBox
        type="email"
        name="email"
        placeholder="Email Address"
        required
      />
      <SubmitButton text={"Send OTP"} disabled={isSubmitting} />
    </form>
  );
};

const ResetPasswordForm = ({
  onSubmit,
  emailAddress,
  setShowSendOTP,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  emailAddress: string | undefined;
  setShowSendOTP: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col py-1">
      <p className="pt-5 pb-2 mx-4 mt-1 relative text-center">
        Email Address: <br /> {emailAddress}{" "}
        <button
          className="text-red-900 text-xs underline"
          onClick={() => setShowSendOTP(true)}
        >
          (Change)
        </button>
      </p>
      <InputBox type="text" name="otp" placeholder="Enter OTP" required />
      <InputBox
        type="password"
        name="password"
        placeholder="New Password"
        required
      />
      <InputBox
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        required
      />
      <SubmitButton text={"Change Password"} />
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
  );
};

export default function ForgotPassword() {
  const [showSendOTP, setShowSendOTP] = useState<boolean>(true);
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hashOTP, setHashOTP] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleSendOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString();
    if (!email) {
      return toast.warn("Check your email address");
    }
    const response = await fetch("/api/forgotPassword/sendOTP", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { message, hashedOTP } = await response.json();
    if (response.ok) {
      toast.success(message);
      setHashOTP(hashedOTP);
      setEmailAddress(email);
      setShowSendOTP(false);
    } else {
      toast.error(message);
    }
  };

  const handleForgotPasswordSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password")?.toString();

    if (password !== formData.get("confirmPassword")) {
      toast.error("Password and Confirm Password must be the same");
      return;
    }

    const response = await fetch("/api/forgotPassword/changePassword", {
      method: "PUT",
      body: JSON.stringify({
        emailAddress,
        otp: formData.get("otp"),
        hashOTP,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { message } = await response.json();
    if (response.ok) {
      toast.success(message);
      router.push("/login");
    } else {
      toast.error(message);
    }
  };

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  return (
    <>
      {showSendOTP ? (
        <AuthModal heading="Forgot Password">
          <SendOTPForm
            onSubmit={handleSendOTPSubmit}
            isSubmitting={isSubmitting}
          />
        </AuthModal>
      ) : (
        <AuthModal heading="Verify OTP">
          <ResetPasswordForm
            onSubmit={handleForgotPasswordSubmit}
            emailAddress={emailAddress}
            setShowSendOTP={setShowSendOTP}
          />
        </AuthModal>
      )}
    </>
  );
}
