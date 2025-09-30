import "./App.css";
import VantaFog from "./components/VantaFog";
import QuizApp from "./components/QuizApp";
import Start from "./components/Start";
import Summary from "./components/Summary";
import type { QuizDataType } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useState } from "react";

function App() {
  const [step, setStep] = useLocalStorage<number>("stepNumber", 0);
  const [quizType, setQuizType] = useState<QuizDataType | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  function setNextStep() {
    if (step === 2) {
      localStorage.clear();
      setStep(0);
    } else {
      setStep((step) => (step = step + 1));
    }
  }

  function refreshQuiz() {
    localStorage.clear();
    setStep(0);
  }

  // console.log(step);
  // localStorage.clear();

  function getQuizTypeData(quizTypeData: QuizDataType) {
    setQuizType(quizTypeData);
  }

  function setCorrectAnsToApp(ans: number) {
    setCorrectAnswers(ans);
  }

  let flexStyle = "justify-between";
  if (step === 2) {
    flexStyle = "justify-center";
  }

  return (
    <>
      <VantaFog>
        <div
          className={
            "relative w-120 min-h-120 flex flex-col " +
            flexStyle +
            " border-1 border-[rgba(55,30,93,255)] rounded-3xl bg-[rgba(41,17,71,0.7)] shadow-2xl"
          }
        >
          {step === 0 && (
            <Start
              setNextStep={setNextStep}
              getQuizTypeData={getQuizTypeData}
            />
          )}
          {step === 1 && (
            <QuizApp
              setNextStep={setNextStep}
              quizType={quizType}
              refreshQuiz={refreshQuiz}
              setCorrectAnsToApp={setCorrectAnsToApp}
            />
          )}
          {step === 2 && (
            <Summary
              setNextStep={setNextStep}
              correctAnswers={correctAnswers}
            />
          )}
        </div>
      </VantaFog>
    </>
  );
}

export default App;
