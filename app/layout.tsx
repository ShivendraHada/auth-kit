import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ToastContainer } from "react-toastify";
const nunito = Nunito({ subsets: ["latin"] });
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Auth Kit",
  description: "User Authentication Toolkit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>
          {children}
          <ToastContainer position="bottom-center" />
        </Providers>
      </body>
    </html>
  );
}
