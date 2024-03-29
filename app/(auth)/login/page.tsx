"use client";
import SubmitButton from "@/components/elements/Button";
import InputBox from "@/components/elements/Input";
import AuthModal from "@/components/modals/AuthModal";
import { useFormState, useFormStatus } from "react-dom";
import authenticate from "@/lib/actions";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(authenticate, undefined);

  useEffect(() => {
    toast.warn(`Pending: ${pending}`);
  }, [pending]);

  useEffect(() => {
    toast.warn(`State: ${state}`);
  }, [state]);

  return (
    <AuthModal heading="Login" subHeading="Welcome Back!">
      <form className="flex flex-col py-2" action={formAction}>
        <InputBox type="email" name="email" placeholder="Email Address" />
        <InputBox type="password" name="password" placeholder="Password" />
        <SubmitButton
          text={pending ? "Logging in..." : "Login"}
          disabled={pending}
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
