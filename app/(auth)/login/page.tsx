"use client";
import SubmitButton from "@/components/elements/Button";
import InputBox from "@/components/elements/Input";
import AuthModal from "@/components/modals/AuthModal";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const formData = new FormData(e.currentTarget);
      const response = await signIn("credentials", {
        username: formData.get("username") as string,
        password: formData.get("password") as string,
        redirect: false,
      });
      if (response?.ok) {
        toast.success("Login Successful!");
        router.push("/");
      } else {
        toast.warn("Invalid Credentials!");
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
          name="username"
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
