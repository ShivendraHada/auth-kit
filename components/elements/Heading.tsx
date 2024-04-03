interface IHeading {
  text: string;
}

const Heading = ({ text }: IHeading) => (
  <h1 className="text-3xl text-center font-semibold mb-2">{text}</h1>
);

const SubHeading = ({ text }: IHeading) => (
  <h6 className="text-md text-center mb-2">{text}</h6>
);

export { Heading, SubHeading };
