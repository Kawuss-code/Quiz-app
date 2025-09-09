import type { QuestionInfo } from "../types";
import { Button } from "./Button";

function QuizCard({
  data,
  onQuestionNumChange,
  isLoading,
}: {
  data?: QuestionInfo;
  onQuestionNumChange: () => void;
  isLoading: boolean;
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
        <Button answer={decodeHTML(data.correct_answer)} />
        {data.incorrect_answers.map((ans) => (
          <Button answer={decodeHTML(ans)} />
        ))}
        <button onClick={onQuestionNumChange}>Next Question</button>
      </div>
    </>
  );
}

export default QuizCard;
