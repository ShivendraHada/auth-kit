"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/modals/AuthModal";
import InputBox from "@/components/elements/Input";
import { SubmitButton } from "@/components/elements/Button";
import { toast } from "react-toastify";

const SendOTPForm = ({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}) => (
  <form onSubmit={onSubmit} className="flex flex-col py-1">
    <InputBox type="email" name="email" placeholder="Email Address" required />
    <SubmitButton
      text={isSubmitting ? "Processing..." : "Send OTP"}
      disabled={isSubmitting}
    />
  </form>
);

const ResetPasswordForm = ({
  onSubmit,
  emailAddress,
  setShowSendOTP,
  isSubmitting,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  emailAddress: string | undefined;
  setShowSendOTP: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
}) => (
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
    <SubmitButton text={isSubmitting ? "Processing..." : "Change Password"} />
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

export default function ForgotPassword() {
  const [showSendOTP, setShowSendOTP] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hashOTP, setHashOTP] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleSendOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email")?.toString();
      if (!email) {
        return toast.warn("Check your email address");
      }
      const response = await fetch("/api/forgot-password/send-otp", {
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
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPasswordSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const formData = new FormData(e.currentTarget);
      const password = formData.get("password")?.toString();
      const confirmPassword = formData.get("confirmPassword")?.toString();

      if (password !== confirmPassword) {
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
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
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
            isSubmitting={isSubmitting}
          />
        </AuthModal>
      )}
    </>
  );
}
