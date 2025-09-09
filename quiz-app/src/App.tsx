import { useState, useEffect } from "react";
import type { QuestionInfo } from "./types";
import "./App.css";
import VantaClouds from "./components/VantaClouds";
import QuizCard from "./components/QuizCard";

function App() {
  const [dataTab, setDataTab] = useState<QuestionInfo[]>([]);
  const [questionNum, setQuestionNum] = useState(0);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        setDataTab(data.results ?? []);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setDataTab([]);
      });
  }, []);

  function QuestionNumChange() {
    setQuestionNum((prev) => (prev < dataTab.length - 1 ? prev + 1 : prev));
  }

  console.log(dataTab);

  return (
    <>
      <VantaClouds>
        <QuizCard
          onQuestionNumChange={QuestionNumChange}
          data={dataTab.length > 0 ? dataTab[questionNum] : undefined}
          isLoading={dataTab.length === 0}
        />
      </VantaClouds>
    </>
  );
}

export default App;
