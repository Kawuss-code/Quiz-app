import { useState, useEffect } from "react";
import type { QuestionInfo } from "./types";
import "./App.css";
import VantaFog from "./components/VantaFog";
import QuizCard from "./components/QuizCard";
// import { useLocalStorage } from 'usehooks-ts'

function App() {
  const [dataTab, setDataTab] = useState<QuestionInfo[]>([]);
  const [questionNum, setQuestionNum] = useState(0);
  const [answersState, setAnswersState] = useState<(null | string)[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("info");

    if (saved) {
      const data = JSON.parse(saved);
      setDataTab(data.results ?? []);
    } else {
      fetch(
        "https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple"
      )
        .then((res) => res.json())
        .then((data) => {
          setDataTab(data.results ?? []);
          localStorage.setItem("info", JSON.stringify(data));
        })
        .catch((error) => {
          console.error("Error: ", error);
          setDataTab([]);
        });
    }
  }, []);

  // localStorage.clear()
  // localStorage.removeItem(key)

  function markAnswer(questionNum: number, isCorrect: boolean) {
    setAnswersState((prev) => {
      const newState = [...prev];
      newState[questionNum] = isCorrect ? "correct" : "wrong";
      return newState;
    });
  }

  function QuestionNumNext() {
    setQuestionNum((prev) => (prev < dataTab.length - 1 ? prev + 1 : prev));
  }

  function QuestionNumPrev() {
    setQuestionNum((prev) => (prev > 0 ? prev - 1 : prev));
  }

  return (
    <>
      <VantaFog>
        <QuizCard
          onQuestionNumNext={QuestionNumNext}
          onQuestionNumPrev={QuestionNumPrev}
          data={dataTab.length > 0 ? dataTab[questionNum] : undefined}
          isLoading={dataTab.length === 0}
          userAnswer={answersState[questionNum]}
          markAnswer={markAnswer}
          questionNum={questionNum}
        />
      </VantaFog>
    </>
  );
}

export default App;
