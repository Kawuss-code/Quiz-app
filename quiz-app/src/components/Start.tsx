function Start({ setNextStep }: { setNextStep: () => void }) {
  function quizTypeInfo() {
    setNextStep();
  }

  return (
    <div className="w-140 h-160 p-4 rounded-4xl bg-[rgba(223,205,222,0.5)]">
      <form action={quizTypeInfo}>
        <input name="query" />
        <button type="submit">Go to Quiz</button>
      </form>
    </div>
  );
}

export default Start;
