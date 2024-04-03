import { useFormStatus } from "react-dom";

interface ISubmitButton {
  text: string;
  disabled?: boolean;
  dynamic?: boolean;
  inProgressText?: string;
}

const SubmitButton = ({
  text,
  disabled = false,
  dynamic = false,
  inProgressText = "Processing...",
}: ISubmitButton) => {
  const { pending } = useFormStatus();
  const isDisabled = pending || disabled;
  const buttonText = dynamic && pending ? inProgressText : text;

  return (
    <button
      type="submit"
      className="px-8 py-2 mt-4 mb-3 bg-[#00ff37bd] w-fit mx-auto shadow font-semibold"
      disabled={isDisabled}
    >
      {buttonText}
    </button>
  );
};

export default SubmitButton;
