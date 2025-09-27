import type { QuestionInfo } from "../types";
import ButtonsPanel from "./ButtonsPanel";
import { useState } from "react";

function QuizCard({
  data,
  onQuestionNumNext,
  onQuestionNumPrev,
  // isLoading,
  userAnswer,
  markAnswer,
  questionNum,
  // questionQuantity,
  setNextStep,
  refreshQuiz,
  setCorrectAnsToApp,
}: {
  data?: QuestionInfo;
  onQuestionNumNext: () => void;
  onQuestionNumPrev: () => void;
  // isLoading: boolean;
  userAnswer: null | string;
  markAnswer: (questionNum: number, isCorrect: boolean) => void;
  questionNum: number;
  // questionQuantity: number | undefined;
  setNextStep: () => void;
  refreshQuiz: () => void;
  setCorrectAnsToApp: (ans: number) => void;
}) {
  const [showWarning, setShowWarning] = useState(false);

  function decodeHTML(str: string) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  }

  function toSummary(): void {
    // console.log("toSummary called, current showWarning:", showWarning);

    try {
      const raw = localStorage.getItem("answersTab");
      // console.log("localStorage after marking answers:", raw);

      // Poprawne parsowanie - localStorage zawiera bezpośrednio tablicę
      const answers: (string | null)[] = JSON.parse(raw || "[]");
      const questionQuantity = Number(
        localStorage.getItem("questionQuantity") || "0"
      );

      // console.log("Answers:", answers);
      // console.log("Question quantity:", questionQuantity);
      // console.log("Answers length:", answers.length);

      const hasAllAnswers = answers.length === questionQuantity;
      const allAnswered =
        hasAllAnswers &&
        answers.every((e: string | null) => e === "correct" || e === "wrong");

      // console.log("Has all answers:", hasAllAnswers);
      // console.log("All answered:", allAnswered);

      if (!allAnswered) {
        // console.log("Setting warning to true");
        setShowWarning(true);
        return;
      }

      let correctCount = 0;
      answers.forEach((answer) => {
        if (answer == "correct") {
          correctCount++;
        }
      });

      setCorrectAnsToApp(correctCount);
      // console.log("Going to next step");
      setShowWarning(false);
      setNextStep();
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      setShowWarning(true);
    }
  }

  // function toSummary() {
  //   const answersData = JSON.parse(
  //     localStorage.getItem("answersTab") || '{"array": []}'
  //   );
  //   const answers: (string | null)[] = answersData.array || [];
  //   const allAnswered = answers.every(
  //     (e: string | null) => e === "correct" || e === "wrong"
  //   );

  //   if (allAnswered) {
  //     setShowWarning(false);
  //     setNextStep();
  //   } else {
  //     setShowWarning(true);
  //   }
  // }

  if (!data) {
    return (
      <div className="w-140 h-160 p-4 rounded-4xl bg-[rgba(223,205,222,0.5)]">
        <p>Loading...</p>
        <button onClick={refreshQuiz}>Refresh</button>
      </div>
    );
  }

  const questionQuantity = Number(localStorage.getItem("questionQuantity"));

  // checking if every question is answered

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
        {showWarning && <p>Mark all answers!</p>}
        {questionNum + 1 === questionQuantity && (
          <button className="m-2" onClick={toSummary}>
            Go to summary
          </button>
        )}
      </div>
    </>
  );
}

export default QuizCard;
