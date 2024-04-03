import Image from "next/image";
import Logo from "@/public/assets/img/sh-sign.png";

export default function Loading() {
  return (
    <div className="relative flex justify-center items-center min-h-screen">
      <div className="absolute animate-spin rounded-full h-36 w-36 border-y border-solid border-purple-800 border-t-transparent shadow-md"></div>
      <Image src={Logo} alt="Our Logo" className="rounded-full h-28 w-28" />
    </div>
  );
}
