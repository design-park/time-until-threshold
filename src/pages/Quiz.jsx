import { useStore } from "../store";

function Quiz() {
  const q1Answer = useStore((state) => state.q1Answer);
  const setQ1Answer = useStore((state) => state.setQ1Answer);
  const q1Confidence = useStore((state) => state.q1Confidence);
  const setQ1Confidence = useStore((state) => state.setQ1Confidence);
  const q2Answer = useStore((state) => state.q2Answer);
  const setQ2Answer = useStore((state) => state.setQ2Answer);
  const q2Confidence = useStore((state) => state.q2Confidence);
  const setQ2Confidence = useStore((state) => state.setQ2Confidence);
  const q3Answer = useStore((state) => state.q3Answer);
  const setQ3Answer = useStore((state) => state.setQ3Answer);
  const q3Confidence = useStore((state) => state.q3Confidence);
  const setQ3Confidence = useStore((state) => state.setQ3Confidence);
  const q4Answer = useStore((state) => state.q4Answer);
  const setQ4Answer = useStore((state) => state.setQ4Answer);
  const q4Confidence = useStore((state) => state.q4Confidence);
  const setQ4Confidence = useStore((state) => state.setQ4Confidence);
  const q5Answer = useStore((state) => state.q5Answer);
  const setQ5Answer = useStore((state) => state.setQ5Answer);
  const q5Confidence = useStore((state) => state.q5Confidence);
  const setQ5Confidence = useStore((state) => state.setQ5Confidence);
  const q6Answer = useStore((state) => state.q6Answer);
  const setQ6Answer = useStore((state) => state.setQ6Answer);
  const q6Confidence = useStore((state) => state.q6Confidence);
  const setQ6Confidence = useStore((state) => state.setQ6Confidence);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "q1":
        setQ1Answer(value);
        break;
      case "q2":
        setQ2Answer(value);
        break;
      case "q3":
        setQ3Answer(value);
        break;
      case "q4":
        setQ4Answer(value);
        break;
      case "q5":
        setQ5Answer(value);
        break;
      case "q6":
        setQ6Answer(value);
        break;
      default:
        break;
    }
  };

  const handleConfidenceChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "q1Confidence":
        setQ1Confidence(value);
        break;
      case "q2Confidence":
        setQ2Confidence(value);
        break;
      case "q3Confidence":
        setQ3Confidence(value);
        break;
      case "q4Confidence":
        setQ4Confidence(value);
        break;
      case "q5Confidence":
        setQ5Confidence(value);
        break;
      case "q6Confidence":
        setQ6Confidence(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch actions to store answers and confidences
  };

  return (
    <div>
      <h1>Quiz</h1>
      <p>
        The following questions designed to see how much you remember about “the
        global surface temperature change relative to 1850-1900”, which is the
        second line graph we showed you during the experiment. The chart
        illustrated observed (1950-2024) and projected (2025-2099) global
        surface temperature changes relative to the 1850-1900 baseline. The
        projections are based on 5 different greenhouse gas emission scenarios:
      </p>
      <ul>
        <li>SSP1-1.9 (Very low emissions)</li>
        <li>SSP1-2.6 (Low emissions)</li>
        <li>SSP2-4.5 (Intermediate emissions)</li>
        <li>SSP3-7.0 (High emissions)</li>
        <li>SSP5-8.5 (Very high emissions)</li>
      </ul>
      <p>
        The graph also illustrated the years we have left to reach 3 thresholds
        which are: 1.5°C, 2.0°C, and 4.0°C.
      </p>
      <p>
        Try to answer as best as you can the following questions. If you don’t
        remember at all, you can choose “I don’t remember”. If you choose the
        answer, please rate your certainty level as well.
      </p>
      <form>
        <h2 className="quiz-question">Question 1</h2>
        <p>
          The SSP1-1.9 (Very low emissions) scenario is in what temperature
          range relative to 1850-1900 at 2099?{" "}
        </p>
        <label htmlFor="q1-1"><input id="q1-1" type="radio" name="q1" value="0-1.5°C" checked={q1Answer === "0-1.5°C"} onChange={handleInputChange} /> 0-1.5°C</label>
        <label htmlFor="q1-2"><input id="q1-2" type="radio" name="q1" value="1.5-2.0°C" checked={q1Answer === "1.5-2.0°C"} onChange={handleInputChange} /> 1.5-2.0°C</label>
        <label htmlFor="q1-3"><input id="q1-3" type="radio" name="q1" value="2.0-4.0°C" checked={q1Answer === "2.0-4.0°C"} onChange={handleInputChange} /> 2.0-4.0°C</label>
        <label htmlFor="q1-4"><input id="q1-4" type="radio" name="q1" value="> 4.0°C" checked={q1Answer === "> 4.0°C"} onChange={handleInputChange} /> &gt; 4.0°C</label>
        <label htmlFor="q1-5"><input id="q1-5" type="radio" name="q1" value="?" checked={q1Answer === "?"} onChange={handleInputChange} /> I don't know</label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
