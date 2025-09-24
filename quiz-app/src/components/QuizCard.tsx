import type { QuestionInfo } from "../types";
import ButtonsPanel from "./ButtonsPanel";

function QuizCard({
  data,
  onQuestionNumNext,
  onQuestionNumPrev,
  isLoading,
  userAnswer,
  markAnswer,
  questionNum,
  // questionQuantity,
  setNextStep,
}: {
  data?: QuestionInfo;
  onQuestionNumNext: () => void;
  onQuestionNumPrev: () => void;
  isLoading: boolean;
  userAnswer: null | string;
  markAnswer: (questionNum: number, isCorrect: boolean) => void;
  questionNum: number;
  // questionQuantity: number | undefined;
  setNextStep: () => void;
}) {
  function decodeHTML(str: string) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  }

  if (isLoading || !data) {
    return (
      <div className="w-140 h-160 p-4 rounded-4xl bg-[rgba(223,205,222,0.5)]">
        <p>Loading...</p>
      </div>
    );
  }

  const questionQuantity = Number(localStorage.getItem("questionQuantity"));

  return (
    <>
      <div className="w-140 h-160 p-4 rounded-4xl bg-[rgba(223,205,222,0.5)]">
        <p>Category: {decodeHTML(data.category)}</p>
        <p>Difficulty: {data.difficulty}</p>
        <p>Question number: {questionNum + 1}</p>
        <p>Question: {decodeHTML(data.question)}</p>
        <ButtonsPanel
          decodeHTML={decodeHTML}
          correctAnswer={decodeHTML(data.correct_answer)}
          incorrectAnswers={data.incorrect_answers}
          userAnswer={userAnswer}
          markAnswer={markAnswer}
          questionNum={questionNum}
        />
        {questionNum !== 0 && (
          <button className="m-2" onClick={onQuestionNumPrev}>
            Previous Question
          </button>
        )}
        {questionNum + 1 !== questionQuantity && (
          <button className="m-2" onClick={onQuestionNumNext}>
            Next Question
          </button>
        )}
        {questionNum + 1 === questionQuantity && (
          <button className="m-2" onClick={setNextStep}>
            Go to summary
          </button>
        )}
      </div>
    </>
  );
}

export default QuizCard;
