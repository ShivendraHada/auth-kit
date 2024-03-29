import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ToastContainer } from "react-toastify";
const nunito = Nunito({ subsets: ["latin"] });
import "react-toastify/dist/ReactToastify.css";
import Providers from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export const metadata: Metadata = {
  title: "Auth Kit",
  description: "User Authentication Toolkit",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers session={session}>
          {children}
          <h1>{session?.user?.name}</h1>
          <ToastContainer position="bottom-center" />
        </Providers>
      </body>
    </html>
  );
}
