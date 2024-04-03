"use client";
import React, { ChangeEvent } from "react";

interface InputBoxProps {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({
  name,
  type,
  placeholder,
  value,
  required,
  onChange,
}: InputBoxProps) => {
  return (
    <div className="pt-5 pb-2 mx-4 mt-1 flex flex-col relative">
      <input
        className={`shadow py-2 px-3 peer outline-none text-base`}
        autoComplete="off"
        type={type}
        name={name}
        placeholder=""
        required={required}
        value={value}
        onChange={onChange}
      />
      <label
        className={`transition-all duration-200 ease-in-out absolute pointer-events-none left-3 top-7 peer-focus:top-0 peer-focus:left-0 peer-focus:text-sm peer-[&:not(:placeholder-shown):not(:focus)]:top-0 peer-[&:not(:placeholder-shown):not(:focus)]:left-0 peer-[&:not(:placeholder-shown):not(:focus)]:text-sm peer-[&:autofill]:top-0 peer-[&:autofill]:left-0 peer-[&:autofill]:text-sm`}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default InputBox;
