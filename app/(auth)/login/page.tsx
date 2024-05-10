"use client";
import InputBox from "@/components/elements/Input";
import AuthModal from "@/components/modals/AuthModal";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitButton } from "@/components/elements/Button";
import { signIn } from "next-auth/react";

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

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const formData = new FormData(e.currentTarget);
      const email: string = formData.get("email") as string;
      const password: string = formData.get("password") as string;

      if (!isValidEmail(email)) {
        toast.error("Email is invalid");
        return;
      }

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.message === "Verified") {
        const response = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        console.log(response);
        if (response?.ok) {
          toast.success("Login Successful!");
          router.push("/");
        } else toast.error("Invalid Credentials");
      } else {
        toast.error(data.error);
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
