import { useState, useEffect } from "react";
import type { QuestionInfo } from "./types";
import "./App.css";
import QuizCard from "./components/QuizCard";

function App() {
  const [dataTab, setDataTab] = useState<QuestionInfo[]>([]);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=15&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        setDataTab(data.results);
      })
      .catch((error) => console.error("Error: ", error));
  }, []);
  return (
    <>
      {dataTab.length > 0 ? <QuizCard data={dataTab[0]} /> : <p>Loading...</p>}
    </>
  );
}

export default App;
