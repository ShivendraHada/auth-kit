"use client";

import SubmitButton from "@/components/elements/button";
import Heading from "@/components/elements/heading";
import InputBox from "@/components/elements/input";

export default function Login() {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target["email"].value);
    console.log(e.target["password"].value);
  };

  return (
    <main className="flex min-h-screen max-w-sm m-auto items-center">
      <div className="flex flex-col justify-center md:w-full w-[95%] mx-auto bg-[#ffffffe3] shadow-lg md:px-3 md:py-6 rounded-lg p-2">
        <Heading text="Login" />
        <h3 className="text-center mt-1">Welcome Back!</h3>
        <form className="flex flex-col py-2" onSubmit={handleSubmit}>
          <InputBox type="email" name="email" placeholder="Email Address" />
          <InputBox type="password" name="password" placeholder="Password" />
          <SubmitButton text="Login" />
          <div className="text-center text-xs">
            <a href="/auth/register" className="hover:text-green-400">
              Register
            </a>{" "}
            |{" "}
            <a href="/auth/forgotPassword" className="hover:text-red-400">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
