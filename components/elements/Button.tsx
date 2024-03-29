import React from "react";
import { useFormStatus } from "react-dom";

interface ISubmitButton {
  text: string;
  disabled?: boolean;
  dynamic?: boolean;
  inProgressText?: string;
}

function SubmitButton({
  text,
  disabled,
  dynamic,
  inProgressText,
}: ISubmitButton) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="px-8 py-2 mt-4 mb-3 bg-[#00ff37bd] w-fit mx-auto shadow font-semibold"
      disabled={pending ? true : disabled}
    >
      {dynamic ? (pending ? inProgressText : text) : text}
    </button>
  );
}

export default SubmitButton;
