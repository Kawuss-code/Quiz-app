import Button from "./Button";

function ButtonsPanel({
  decodeHTML,
  correctAnswer,
  incorrectAnswers,
  userAnswer,
  markAnswer,
  questionNum,
}: {
  decodeHTML: (str: string) => string;
  correctAnswer: string;
  incorrectAnswers: Array<string>;
  userAnswer: null | string;
  markAnswer: (questionNum: number, isCorrect: boolean) => void;
  questionNum: number;
}) {
  const answersTable: Array<string> = [];
  incorrectAnswers.map((ans) => {
    answersTable.push(decodeHTML(ans));
  });
  answersTable.push(correctAnswer);
  answersTable.sort();
  console.log(answersTable);

  return (
    <>
      {answersTable.map((ans) => (
        <Button
          key={ans}
          answer={ans}
          buttonBgr={
            userAnswer === "correct" || userAnswer === "wrong"
              ? ans === correctAnswer
                ? "bg-[rgba(22,219,147,255)]"
                : "bg-[rgba(179,38,30,255)]"
              : "bg-[rgba(232,222,248,255)] hover:bg-[rgba(232,222,248,0.5)]"
          }
          showAnswers={() => markAnswer(questionNum, ans === correctAnswer)}
        />
      ))}
    </>
  );
}

export default ButtonsPanel;
