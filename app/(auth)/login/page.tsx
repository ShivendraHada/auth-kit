"use client";
import SubmitButton from "@/components/elements/Button";
import InputBox from "@/components/elements/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import AuthModal from "@/components/modals/AuthModal";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      username: e.target["email"].value,
      password: e.target["password"].value,
    });
    if (res?.error) {
      toast.error("Invalid Credentials! Please try again");
      return;
    }
    toast.success("Login Successfully!");
  };

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  return (
    <AuthModal heading="Login" subHeading="Welcome Back!">
      <form
        className="flex flex-col py-2"
        onSubmit={handleSubmit}
        method="POST"
      >
        <InputBox type="email" name="email" placeholder="Email Address" />
        <InputBox type="password" name="password" placeholder="Password" />
        <SubmitButton text="Login" />
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
