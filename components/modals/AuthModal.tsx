import React from "react";
import { Heading, SubHeading } from "../elements/Heading";

interface IAuthModal {
  heading: string;
  subHeading?: string;
  children: React.ReactNode;
}

function AuthModal({ heading, subHeading, children }: IAuthModal) {
  return (
    <main className="flex min-h-screen items-center bg-gradient-to-r from-yellow-200 to-teal-200">
      <div className="flex flex-col justify-center max-w-sm md:w-full w-[95%] mx-auto bg-[#ffffffe3] shadow md:px-3 md:py-6 rounded-lg p-2 pt-5">
        <Heading text={heading} />
        {subHeading && <SubHeading text={subHeading} />}
        {children}
      </div>
    </main>
  );
}

export default AuthModal;
