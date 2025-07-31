import { useEffect, useMemo, useRef, useState } from "react";
import AnimatedChart2 from "../components/AnimatedChart2";
import Chart2 from "../components/Chart2";
import { useStore } from "../store";
import { simpleHash } from "../utils";

const DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

function TrainingChartPage() {
  const condition = useStore((state) => state.condition);
  const setTrainingChartSeen = useStore((state) => state.setTrainingChartSeen);
  const startTimestamp = useRef(Date.now());
  const [timeLeft, setTimeLeft] = useState(DURATION);

  const [code, setCode] = useState("");
  const codeIsValid = useMemo(() => {
    return simpleHash(code) === "00027v1";
  }, [code]);

  const handleSubmit = () => {
    setTrainingChartSeen(true);
  };

  useEffect(() => {
    startTimestamp.current = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTimestamp.current;
      const remaining = DURATION - elapsed;

      if (remaining <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
      } else {
        setTimeLeft(remaining);
      }
    }, 200);
  }, []);

  return (
    <div className="centerBody nobg">
      {condition === "control" ? <Chart2 /> : <AnimatedChart2 />}
      <div className="actionButtonContainer">
        {timeLeft <= 0 && (
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ask code to researcher"
            className="codeInput"
            name="codeInput"
          />
        )}
        <button
          className="userActionButton"
          onClick={handleSubmit}
          disabled={timeLeft > 0 || !codeIsValid}
        >
          {timeLeft > 0
            ? `Next in ${Math.ceil(timeLeft / 1000)} seconds`
            : codeIsValid
            ? "Next"
            : "Enter code to proceed"}
        </button>
      </div>
    </div>
  );
}

export default TrainingChartPage;
