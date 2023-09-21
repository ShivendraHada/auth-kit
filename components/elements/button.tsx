import React from "react";

interface ISubmitButton {
  text: string;
}

function SubmitButton({ text }: ISubmitButton) {
  return (
    <button
      type="submit"
      className="px-8 py-2 mt-4 mb-3 bg-green-300 w-fit mx-auto shadow-md font-semibold"
    >
      {text}
    </button>
  );
}

export default SubmitButton;
