function Summary({
  setNextStep,
  correctAnswers,
}: {
  setNextStep: () => void;
  correctAnswers: number;
}) {
  const questionQuantity = localStorage.getItem("questionQuantity");

  return (
    <div className="w-140 h-160 p-4 rounded-4xl bg-[rgba(223,205,222,0.5)]">
      {correctAnswers}/{questionQuantity}
      <button onClick={setNextStep}>Start a new quiz</button>
    </div>
  );
}

export default Summary;
