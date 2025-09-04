function QuizCard({ data }: { data: QuestionInfo }) {
  return <div>{data.category}</div>;
}

export default QuizCard;

interface QuestionInfo {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
