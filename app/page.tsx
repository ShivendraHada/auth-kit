"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default function HomePage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logout Successful!");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {session?.user ? (
        <>
          <h1 className="text-3xl">{session.user.name}</h1>
          <button
            className="font-medium mt-2 text-blue-600 hover:underline"
            onClick={handleLogout}
          >
            Log out
          </button>
        </>
      ) : (
        <Link
          className="font-medium mt-2 text-blue-600 hover:underline"
          href="/login"
        >
          Login
        </Link>
      )}
    </main>
  );
}
