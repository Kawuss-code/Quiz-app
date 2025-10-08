function Summary({
  setNextStep,
  correctAnswers,
}: {
  setNextStep: () => void;
  correctAnswers: number;
}) {
  const questionQuantity = localStorage.getItem("questionQuantity");
  const percent = (correctAnswers / Number(questionQuantity)) * 100;
  console.log(percent);

  return (
    <div className="flex flex-col items-center mt-auto mb-auto">
      <p className="text-3xl font-bold">
        {percent == 100 && "Perfect!"}
        {percent < 100 && percent >= 80 && "Very good job!"}
        {percent < 80 && percent >= 70 && "Good job!"}
        {percent < 70 && percent >= 50 && "Good!"}
        {percent < 50 && percent >= 30 && "Not so bad"}
        {percent < 30 && percent >= 10 && "Could be better"}
        {percent < 10 && percent >= 0 && "Oh no!"}
      </p>
      <p className="m-2 mt-4 text-xl font-bold">
        - {correctAnswers} / {questionQuantity} -
      </p>
      <button
        className="w-1/2 py-3 mt-4 
         rounded-xl 
         bg-gradient-to-r from-fuchsia-950 to-purple-900 
         text-white font-semibold text-lg 
         shadow-lg hover:scale-105 transform transition 
         focus:outline-none focus:ring-2 focus:ring-fuchsia-900"
        onClick={setNextStep}
      >
        Start a new quiz
      </button>
    </div>
  );
}

export default Summary;
