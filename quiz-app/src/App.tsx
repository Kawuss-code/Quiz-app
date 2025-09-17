import "./App.css";
import VantaFog from "./components/VantaFog";
import QuizApp from "./components/QuizApp";
import Start from "./components/Start";
import Summary from "./components/Summary";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const stepArray = ["start", "quiz", "summary"];
  const [step, setStep] = useLocalStorage<number>("stepNumber", 0);

  function setNextStep() {
    if (step === 2) {
      setStep(0);
    } else {
      setStep((step) => (step = step + 1));
    }
  }

  console.log(step);
  localStorage.clear();

  return (
    <>
      <VantaFog>
        {step === 0 && <Start setNextStep={setNextStep} />}
        {step === 1 && <QuizApp />}
        {step === 2 && <Summary />}
      </VantaFog>
    </>
  );
}

export default App;
