"use client";
import SubmitButton from "@/components/elements/Button";
import InputBox from "@/components/elements/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AuthModal from "@/components/modals/AuthModal";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();
  const [inProgress, setInProgress] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setInProgress(true);
    const data = new FormData(e.target);
    const res = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
    });
    if (res?.error) {
      toast.error("Invalid Credentials! Please try again");
      setInProgress(false);
      return;
    }
    router.push("/");
    toast.success("Login Successful!");
    setInProgress(false);
  };

  useEffect(() => {
    if (session) router.push("/");
  }, [session]);

  return (
    <AuthModal heading="Login" subHeading="Welcome Back!">
      <form
        className="flex flex-col py-2"
        onSubmit={handleSubmit}
        method="POST"
      >
        <InputBox type="email" name="email" placeholder="Email Address" />
        <InputBox type="password" name="password" placeholder="Password" />
        <SubmitButton
          text={inProgress ? "Logging in..." : "Login"}
          disabled={inProgress}
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
