import React from "react";

interface IHeading {
  text: string;
}

function Heading({ text }: IHeading) {
  return <h1 className="text-4xl text-center font-semibold mb-2">{text}</h1>;
}

export default Heading;
