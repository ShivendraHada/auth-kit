import React from "react";

interface ISubmitButton {
  text: string;
  disabled?: boolean;
}

function SubmitButton({ text, disabled }: ISubmitButton) {
  return (
    <button
      type="submit"
      className="px-8 py-2 mt-4 mb-3 bg-[#00ff37bd] w-fit mx-auto shadow font-semibold"
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default SubmitButton;
