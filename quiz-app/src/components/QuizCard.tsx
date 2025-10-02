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
        setTimeout(() => {
          setShowWarning(false);
        }, 3000);
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
      <div className="flex flex-col items-center">
        <p>Loading...</p>
        <button onClick={refreshQuiz}>Refresh</button>
      </div>
    );
  }

  const questionQuantity = Number(localStorage.getItem("questionQuantity"));

  // checking if every question is answered

  return (
    <>
      {/* <p>Category: {decodeHTML(data.category)}</p> */}
      {/* <p>Difficulty: {data.difficulty}</p> */}
      <div className="m-10">
        <p className="text-xl font-bold">- {questionNum + 1} -</p>
        <p className="mt-2 mb-3 text-2xl font-black">
          {decodeHTML(data.question)}
        </p>
        <ButtonsPanel
          decodeHTML={decodeHTML}
          correctAnswer={decodeHTML(data.correct_answer)}
          incorrectAnswers={data.incorrect_answers}
          userAnswer={userAnswer}
          markAnswer={markAnswer}
          questionNum={questionNum}
        />
      </div>

      <div className="absolute bottom-15 right-7">
        {showWarning && questionNum + 1 === questionQuantity && (
          <p className="text-red-600 font-semibold animate-pulse">
            Mark all answers!
          </p>
        )}
      </div>
      <div className="absolute w-full h-15 bottom-0 flex flex-row justify-between rounded-b-3xl rounded-bl-3xl bg-[rgba(30,13,59,0.6)]">
        {questionNum !== 0 && (
          <button className="m-2 ml-10" onClick={onQuestionNumPrev}>
            Previous Question
          </button>
        )}
        {questionNum + 1 !== questionQuantity && (
          <button
            className="m-2 mr-10 [&:only-child]:ml-auto"
            onClick={onQuestionNumNext}
          >
            Next Question
          </button>
        )}
        {questionNum + 1 === questionQuantity && (
          <button className="m-2 mr-10" onClick={toSummary}>
            Go to summary
          </button>
        )}
      </div>
    </>
  );
}

export default QuizCard;
