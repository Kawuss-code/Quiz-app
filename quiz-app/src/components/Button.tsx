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
      className={`w-100 h-20 m-1 p-4 border-2 rounded-xl ${buttonBgr} duration-200`}
      onClick={showAnswers}
    >
      {answer}
    </button>
  );
}

export default Button;
