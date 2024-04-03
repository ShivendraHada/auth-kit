"use client";

import SubmitButton from "@/components/elements/Button";
import InputBox from "@/components/elements/Input";
import AuthModal from "@/components/modals/AuthModal";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password must be the same");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const { message }: { message: string } = await response.json();
      if (response?.ok) {
        toast.success(message);
        router.push("/login");
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Error registering user");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AuthModal heading="Register">
      <form
        autoComplete="off"
        className="flex flex-col py-2"
        onSubmit={handleSubmit}
        method="POST"
      >
        <InputBox
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <InputBox
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <InputBox
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <InputBox
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        <SubmitButton
          text={isProcessing ? "Processing..." : "Register"}
          disabled={isProcessing}
        />
        <a href="/login" className="text-center text-xs">
          Login
        </a>
      </form>
    </AuthModal>
  );
}
