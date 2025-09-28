function Button({
  answer,
  buttonBgr,
  showAnswers,
}: {
  answer: string;
  buttonBgr: string;
  showAnswers: () => void;
}) {
  return (
    <button
      className={`w-full h-20 m-1 p-4 border-1 border-[rgba(66,46,98,255)] rounded-xl ${buttonBgr} duration-200`}
      onClick={showAnswers}
    >
      {answer}
    </button>
  );
}

export default Button;
