function Summary({ setNextStep }: { setNextStep: () => void }) {
  localStorage.clear();

  return (
    <div className="w-140 h-160 p-4 rounded-4xl bg-[rgba(223,205,222,0.5)]">
      <button onClick={setNextStep}>Start a new quiz</button>
    </div>
  );
}

export default Summary;
