"use client";

import SubmitButton from "@/components/elements/Button";
import InputBox from "@/components/elements/Input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import AuthModal from "@/components/modals/AuthModal";

export default function Register() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");
    if (password !== confirmPassword) {
      toast.error("Password must be same!");
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.get("name"),
          email,
          password,
        }),
      });
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      if (!response.ok) {
        toast.error(jsonResponse.message);
        setIsSubmitting(false);
        return;
      }
      e.target.reset();
      toast.success(jsonResponse.message);
    } catch (error) {}
    setIsSubmitting(false);
  };

  return (
    <AuthModal heading="Register">
      <form className="flex flex-col py-2" onSubmit={handleSubmit}>
        <InputBox type="text" name="name" placeholder="Full Name" />
        <InputBox type="email" name="email" placeholder="Email Address" />
        <InputBox type="password" name="password" placeholder="Password" />
        <InputBox
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <SubmitButton
          text={isSubmitting ? "Registering..." : "Register"}
          disabled={isSubmitting}
        />
        {/* <button
          type="submit"
          className="px-8 py-2 mt-4 mb-3 bg-[#00ff37bd] w-fit mx-auto shadow font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button> */}
        <a href="/login" className="text-center text-xs">
          Login
        </a>
      </form>
    </AuthModal>
  );
}
