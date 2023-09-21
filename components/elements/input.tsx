"use client";

import React from "react";

interface IInputBox {
  name: string;
  type: string;
  placeholder: string;
}

function InputBox({ name, type, placeholder }: IInputBox) {
  return (
    <div className="pt-5 pb-2 mx-4 mt-1 flex flex-col relative">
      <input
        className={`shadow-md p-2 peer outline-none`}
        type={type}
        name={name}
        required
      />
      <label
        className={`transition-all duration-200 ease-in-out absolute pointer-events-none left-3 top-7 peer-focus:top-0 peer-focus:left-0 peer-focus:text-sm peer-valid:top-0 peer-valid:left-0 peer-valid:text-sm`}
      >
        {placeholder}
      </label>
    </div>
  );
}

export default InputBox;
