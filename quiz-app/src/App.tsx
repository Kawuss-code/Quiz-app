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

  return (
    <>
      <VantaFog>
        {step === 0 && (
          <Start setNextStep={setNextStep} getQuizTypeData={getQuizTypeData} />
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
          <Summary setNextStep={setNextStep} correctAnswers={correctAnswers} />
        )}
      </VantaFog>
    </>
  );
}

export default App;
