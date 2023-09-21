"use client";

import SubmitButton from "@/components/elements/button";
import Heading from "@/components/elements/heading";
import InputBox from "@/components/elements/input";
import { toast } from "react-toastify";

export default function Register() {
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
    <main className="flex min-h-screen max-w-sm m-auto items-center">
      <div className="flex flex-col justify-center md:w-full w-[95%] mx-auto bg-[#ffffffe3] shadow-lg md:px-3 md:py-6 rounded-lg p-2">
        <Heading text="Register" />
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
      </div>
    </main>
  );
}
