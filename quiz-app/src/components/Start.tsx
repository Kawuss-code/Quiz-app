import type { QuizDataType } from "../types";

function Start({
  setNextStep,
  getQuizTypeData,
}: {
  setNextStep: () => void;
  getQuizTypeData: (quizTypeData: QuizDataType) => void;
}) {
  const categories = [
    "Any Category",
    "General Knowledge",
    "Entertainment: Books",
    "Entertainment: Film",
    "Entertainment: Music",
    "Entertainment: Musicals & Theatres",
    "Entertainment: Television",
    "Entertainment: Video Games",
    "Entertainment: Board Games",
    "Science & Nature",
    "Science: Computers",
    "Science: Mathematics",
    "Mythology",
    "Sports",
    "Geography",
    "History",
    "Politics",
    "Art",
    "Celebrities",
    "Animals",
    "Vehicles",
    "Entertainment: Comics",
    "Science: Gadgets",
    "Entertainment: Japanese Anime & Manga",
    "Entertainment: Cartoon & Animations",
  ];

  const values = [
    "any",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
  ];

  function handleSubmit(object: React.FormEvent<HTMLFormElement>) {
    object.preventDefault();

    const formData = new FormData(object.currentTarget);

    const quizData: QuizDataType = {
      number: Number(formData.get("questionQuantity")),
      category: formData.get("category") as string,
      difficulty: formData.get("difficulty") as string,
    };

    getQuizTypeData(quizData);

    setNextStep();
  }

  return (
    <div className="w-140 h-160 p-4 rounded-4xl bg-[rgba(223,205,222,0.5)]">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          className="m-2 border-2"
          type="number"
          min={1}
          max={50}
          name="questionQuantity"
          defaultValue={10}
        />
        <select className="m-2 border-2" name="category" id="category">
          {values.map((value, i) => (
            <option key={value} value={value}>
              {categories[i]}
            </option>
          ))}
        </select>
        <select className="m-2 border-2" name="difficulty" id="difficulty">
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button type="submit">Go to Quiz</button>
      </form>
    </div>
  );
}

export default Start;
