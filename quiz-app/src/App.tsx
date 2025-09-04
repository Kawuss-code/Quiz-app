import "./App.css";
import QuizCard from "./components/QuizCard";

function App() {
  fetch(
    "https://opentdb.com/api.php?amount=5&category=15&difficulty=medium&type=multiple"
  )
    .then((res) => res.json())
    .then((data) => {
      const tab = data.results;
      console.log(tab[0]);
      return (
        <>
          <QuizCard data={tab[0]} />
        </>
      );
    })
    .catch((error) => console.error("Error: ", error));
}

export default App;
