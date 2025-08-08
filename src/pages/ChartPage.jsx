import { useEffect, useMemo, useRef, useState } from "react";
import AnimatedChart from "../components/AnimatedChart";
import Chart from "../components/Chart";
import { useStore } from "../store";
import { simpleHash } from "../utils";

//const DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const DURATION = 30 * 1000; // 30 seconds in milliseconds

function ChartPage() {
  const condition = useStore((state) => state.condition);
  const setChartSeen = useStore((state) => state.setChartSeen);
  const startTimestamp = useRef(Date.now());
  const [timeLeft, setTimeLeft] = useState(DURATION);

  const [code, setCode] = useState("");
  const codeIsValid = useMemo(() => {
    return simpleHash(code) === "1kaidnz";
  }, [code]);

  const handleSubmit = () => {
    setChartSeen(true);
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
      {condition === "control" ? <Chart /> : <AnimatedChart />}
      <div className="actionButtonContainer">
        {timeLeft <= 0 && (
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ask code to researcher"
            className="codeInput"
            name="codeInput"
            autoComplete="off"
          />
        )}
        <button
          className="userActionButton"
          onClick={handleSubmit}
          disabled={timeLeft > 0 || !codeIsValid}
          style={{
            marginLeft: "10px",
          }}
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

export default ChartPage;
