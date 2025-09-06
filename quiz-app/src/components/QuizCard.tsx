import type { QuestionInfo } from "../types";

function QuizCard({ data }: { data: QuestionInfo }) {
  return (
    <div>
      <p>{data.category}</p>
      <p>{data.difficulty}</p>
    </div>
  );
}

export default QuizCard;
