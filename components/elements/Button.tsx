interface SubmitButtonProps {
  text: string;
  disabled?: boolean;
}

const SubmitButton = ({ text, disabled = false }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className="px-8 py-2 mt-4 mb-3 bg-[#00ff37bd] w-fit mx-auto shadow font-semibold"
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
