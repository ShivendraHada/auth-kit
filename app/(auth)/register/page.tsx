"use client";

import SubmitButton from "@/components/elements/Button";
import InputBox from "@/components/elements/Input";
import { useState } from "react";
import { toast } from "react-toastify";
import AuthModal from "@/components/modals/AuthModal";

export default function Register() {
  const [inProgress, setInProgress] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setInProgress(true);
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");
    if (password !== confirmPassword) {
      toast.error("Password must be same!");
      setInProgress(false);
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
      if (!response.ok) {
        toast.error(jsonResponse.message);
        setInProgress(false);
        return;
      }
      e.target.reset();
      toast.success(jsonResponse.message);
    } catch (error) {}
    setInProgress(false);
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
          text={inProgress ? "Registering..." : "Register"}
          disabled={inProgress}
        />
        <a href="/login" className="text-center text-xs">
          Login
        </a>
      </form>
    </AuthModal>
  );
}
