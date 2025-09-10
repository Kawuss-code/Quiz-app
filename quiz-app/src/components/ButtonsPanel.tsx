import { useState, useEffect } from "react";
import Button from "./Button";

function ButtonsPanel({
  decodeHTML,
  correctAnswer,
  incorrectAnswers,
}: {
  decodeHTML: (str: string) => string;
  correctAnswer: string;
  incorrectAnswers: Array<string>;
}) {
  const [correctButtonBgr, setCorrectButtonBgr] = useState(
    "bg-[rgba(232,222,248,255)] hover:bg-[rgba(232,222,248,0.5)]"
  );
  const [wrongButtonBgr, setWrongButtonBgr] = useState(
    "bg-[rgba(232,222,248,255)] hover:bg-[rgba(232,222,248,0.5)]"
  );

  useEffect(() => {
    setCorrectButtonBgr(
      "bg-[rgba(232,222,248,255)] hover:bg-[rgba(232,222,248,0.5)]"
    );
    setWrongButtonBgr(
      "bg-[rgba(232,222,248,255)] hover:bg-[rgba(232,222,248,0.5)]"
    );
  }, [correctAnswer, incorrectAnswers]);

  function showAnswers() {
    setCorrectButtonBgr("bg-[rgba(22,219,147,255)]");
    setWrongButtonBgr("bg-[rgba(179,38,30,255)]");
  }

  return (
    <>
      <Button
        answer={correctAnswer}
        buttonBgr={correctButtonBgr}
        showAnswers={showAnswers}
      />
      {incorrectAnswers.map((ans) => (
        <Button
          key={ans}
          answer={decodeHTML(ans)}
          buttonBgr={wrongButtonBgr}
          showAnswers={showAnswers}
        />
      ))}
    </>
  );
}

export default ButtonsPanel;
