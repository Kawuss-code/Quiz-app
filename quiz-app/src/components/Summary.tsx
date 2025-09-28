function Summary({
  setNextStep,
  correctAnswers,
}: {
  setNextStep: () => void;
  correctAnswers: number;
}) {
  const questionQuantity = localStorage.getItem("questionQuantity");

  return (
    <>
      {correctAnswers}/{questionQuantity}
      <button onClick={setNextStep}>Start a new quiz</button>
    </>
  );
}

export default Summary;
