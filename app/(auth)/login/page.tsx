"use client";
import InputBox from "@/components/elements/Input";
import AuthModal from "@/components/modals/AuthModal";
import { FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitButton } from "@/components/elements/Button";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    const confirmedEmail = searchParams.get("confirmedEmail");
    const error = searchParams.get("error");
    if (confirmedEmail) {
      toast.success("Email Verified!", { toastId: "once" });
    } else if (error) {
      toast.error("Email Verification Failed!"), { toastId: "once" };
    }
    router.push("/login");
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const formData = new FormData(e.currentTarget);
      const response = await signIn("credentials", {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        redirect: false,
      });
      console.log(response);
      if (response?.error) {
        toast.warn(response?.error);
      } else if (response?.ok) {
        toast.success("Login Successful!");
        router.push("/");
      }
    } catch (error: any) {
      console.error("Login Error: ", error.message);
      return "Something Went Wrong!";
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AuthModal heading="Login" subHeading="Welcome Back!">
      <form
        autoComplete="off"
        className="flex flex-col py-2"
        onSubmit={handleSubmit}
        method="POST"
      >
        <InputBox
          type="email"
          name="email"
          placeholder="Email Address"
          required
        />
        <InputBox
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <SubmitButton
          text={isProcessing ? "Logging in..." : "Login"}
          disabled={isProcessing}
        />
        <div className="text-center text-xs">
          <a href="/register" className="hover:text-green-400">
            Register
          </a>{" "}
          |{" "}
          <a href="/forgotPassword" className="hover:text-red-400">
            Forgot Password?
          </a>
        </div>
      </form>
    </AuthModal>
  );
}
