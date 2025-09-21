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

  function setNextStep() {
    if (step === 2) {
      setStep(0);
    } else {
      setStep((step) => (step = step + 1));
    }
  }

  console.log(step);
  localStorage.clear();

  function getQuizTypeData(quizTypeData: QuizDataType) {
    setQuizType(quizTypeData);
  }

  return (
    <>
      <VantaFog>
        {step === 0 && (
          <Start setNextStep={setNextStep} getQuizTypeData={getQuizTypeData} />
        )}
        {step === 1 && (
          <QuizApp setNextStep={setNextStep} quizType={quizType} />
        )}
        {step === 2 && <Summary />}
      </VantaFog>
    </>
  );
}

export default App;
