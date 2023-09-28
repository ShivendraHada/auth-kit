import React from "react";

interface IHeading {
  text: string;
}

function Heading({ text }: IHeading) {
  return <h1 className="text-3xl text-center font-semibold mb-2">{text}</h1>;
}

function SubHeading({ text }: IHeading) {
  return <h6 className="text-md text-center mb-2">{text}</h6>;
}

export { Heading, SubHeading };
