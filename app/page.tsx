"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/login");
    },
  });
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2 className="text-4xl">
        {session
          ? `Welcome, ${session.user && session.user.email}`
          : "Please Login First!"}
      </h2>
      {session ? (
        <button
          className="text-xl mt-5 text-red-500"
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
        >
          Sign Out!
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Dashboard;
