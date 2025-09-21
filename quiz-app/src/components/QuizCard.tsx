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
  setNextStep,
}: {
  data?: QuestionInfo;
  onQuestionNumNext: () => void;
  onQuestionNumPrev: () => void;
  isLoading: boolean;
  userAnswer: null | string;
  markAnswer: (questionNum: number, isCorrect: boolean) => void;
  questionNum: number;
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

  return (
    <>
      <div className="w-140 h-160 p-4 rounded-4xl bg-[rgba(223,205,222,0.5)]">
        <p>Category: {data.category}</p>
        <p>Difficulty: {data.difficulty}</p>
        <p>Question: {decodeHTML(data.question)}</p>
        <ButtonsPanel
          decodeHTML={decodeHTML}
          correctAnswer={decodeHTML(data.correct_answer)}
          incorrectAnswers={data.incorrect_answers}
          userAnswer={userAnswer}
          markAnswer={markAnswer}
          questionNum={questionNum}
        />
        <button onClick={onQuestionNumPrev}>Previous Question</button>
        <button onClick={onQuestionNumNext}>Next Question</button>
        <button onClick={setNextStep}>Go to summary</button>
      </div>
    </>
  );
}

export default QuizCard;
