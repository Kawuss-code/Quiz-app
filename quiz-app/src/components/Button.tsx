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
      className={`w-100 h-20 p-4 rounded-xl ${buttonBgr} duration-200`}
      onClick={showAnswers}
    >
      {answer}
    </button>
  );
}

export default Button;
