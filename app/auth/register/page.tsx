"use client";

import SubmitButton from "@/components/elements/Button";
import InputBox from "@/components/elements/Input";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import AuthModal from "@/components/modals/authModal";

export default function Register() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target["email"].value;
    const password = e.target["name"].value;

    if (password !== e.target["confirmPassword"].value) {
      toast.error("Password must be same!");
      return;
    }

    console.log(email);
    console.log(password);
    console.log(e.target["confirmPassword"].value);
  };

  return (
    <AuthModal heading="Register">
      <form className="flex flex-col py-2" onSubmit={handleSubmit}>
        <InputBox type="text" name="full-name" placeholder="Full Name" />
        <InputBox type="email" name="email" placeholder="Email Address" />
        <InputBox type="password" name="password" placeholder="Password" />
        <InputBox
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <SubmitButton text="Register" />
        <a href="/auth/login" className="text-center text-xs">
          Login
        </a>
      </form>
    </AuthModal>
  );
}
