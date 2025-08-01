import { useEffect, useMemo, useState } from "react";
import { useStore } from "../store";

function Quiz() {
  const setQuizCompleted = useStore((state) => state.setQuizCompleted);
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

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuizCompleted(true);
  };

  return (
    <div className="centerBody">
      <section className="survey-section">
        <h1>Quiz</h1>
        <p>
          The following questions designed to see how much you remember about
          “the global surface temperature change relative to 1850-1900”, which
          is the second line graph we showed you during the experiment. The
          chart illustrated observed (1950-2024) and projected (2025-2099)
          global surface temperature changes relative to the 1850-1900 baseline.
          The projections are based on 5 different greenhouse gas emission
          scenarios:
        </p>
        <ul>
          <li>SSP1-1.9 (Very low emissions)</li>
          <li>SSP1-2.6 (Low emissions)</li>
          <li>SSP2-4.5 (Intermediate emissions)</li>
          <li>SSP3-7.0 (High emissions)</li>
          <li>SSP5-8.5 (Very high emissions)</li>
        </ul>
        <p>
          The graph also illustrated the years we have left to reach 3
          thresholds which are: 1.5°C, 2.0°C, and 4.0°C.
        </p>
        <p>
          Try to answer as best as you can the following questions. If you don’t
          remember at all, you can choose “I don’t remember”. If you choose the
          answer, please rate your certainty level as well.
        </p>
      </section>
      <form>
        <section className="survey-section">
          <h2 className="quiz-question">Question 1</h2>
          <p>
            The SSP1-1.9 (Very low emissions) scenario is in what temperature
            range relative to 1850-1900 at 2099?{" "}
          </p>
          <label htmlFor="q1-1">
            <input
              id="q1-1"
              type="radio"
              name="q1"
              value="0-1.5°C"
              checked={q1Answer === "0-1.5°C"}
              onChange={handleInputChange}
            />{" "}
            0-1.5°C
          </label>{" "}
          <br />
          <label htmlFor="q1-2">
            <input
              id="q1-2"
              type="radio"
              name="q1"
              value="1.5-2.0°C"
              checked={q1Answer === "1.5-2.0°C"}
              onChange={handleInputChange}
            />{" "}
            1.5-2.0°C
          </label>{" "}
          <br />
          <label htmlFor="q1-3">
            <input
              id="q1-3"
              type="radio"
              name="q1"
              value="2.0-4.0°C"
              checked={q1Answer === "2.0-4.0°C"}
              onChange={handleInputChange}
            />{" "}
            2.0-4.0°C
          </label>{" "}
          <br />
          <label htmlFor="q1-4">
            <input
              id="q1-4"
              type="radio"
              name="q1"
              value="> 4.0°C"
              checked={q1Answer === "> 4.0°C"}
              onChange={handleInputChange}
            />{" "}
            &gt; 4.0°C
          </label>{" "}
          <br />
          <label htmlFor="q1-5">
            <input
              id="q1-5"
              type="radio"
              name="q1"
              value="?"
              checked={q1Answer === "?"}
              onChange={handleInputChange}
            />{" "}
            I don't know
          </label>
          {q1Answer && q1Answer !== "?" && q1Answer !== "" && (
            <ConfidenceTable questionNumber={1} />
          )}
        </section>
        <NumberQuestion
          questionNumber={2}
          question="Try to remember in how many years from this year (2025) the SSP5-8.5 (Very high emissions) scenario will reach the 1.5 °C threshold. It doesn’t need to be precise. Try to remember approximately how many years."
          textBeforeInput="Approximately in"
          textAfterInput="years"
        />

        <NumberQuestion
          questionNumber={3}
          question="Try to remember in how many years from this year (2025) the SSP5-8.5 (Very high emissions) scenario will reach the 2.0°C threshold. It doesn’t need to be precise. Try to remember approximately how many years."
          textBeforeInput="Approximately in"
          textAfterInput="years"
        />

        <NumberQuestion
          questionNumber={4}
          question="Try to remember in how many years from this year (2025) the SSP5-8.5 (Very high emissions) scenario will reach the 4.0 °C threshold. It doesn’t need to be precise. Try to remember approximately how many years."
          textBeforeInput="Approximately in"
          textAfterInput="years"
        />

        <NumberQuestion
          questionNumber={5}
          question="The year difference between the first and last scenario that reached the 1.5°C threshold was 6 years. Then what was the year different between the first and last scenario that reached the 2.0°C threshold?"
          textBeforeInput="Approximately in"
          textAfterInput="years"
        />

        <NumberQuestion
          questionNumber={6}
          question="The year difference between the first and last scenario that reached the 1.5°C threshold was 6 years. Then what was the year difference between the first and last scenario that reached the 4.0°C threshold?"
          textBeforeInput="More than"
          textAfterInput="years"
        />

        <div className="actionButtonContainer">
          <button
            className="userActionButton"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

function NumberQuestion({
  questionNumber,
  question,
  textBeforeInput,
  textAfterInput,
}) {
  const [dontKnow, setDontKnow] = useState(false);
  const [value, setValue] = useState("");
  const handleDontKnowChange = (e) => {
    setDontKnow(e.target.checked);
    setValue("");
  };
  return (
    <section className="survey-section">
      <h2 className="quiz-question">Question {questionNumber}</h2>
      <p>{question}</p>
      <p>
        {textBeforeInput}{" "}
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={dontKnow}
        />{" "}
        {textAfterInput}
      </p>
      <label htmlFor={`q${questionNumber}-dont-know`}>
        <input
          type="checkbox"
          id={`q${questionNumber}-dont-know`}
          checked={dontKnow}
          onChange={handleDontKnowChange}
        />{" "}
        I don't know
      </label>
      {value !== "" && <ConfidenceTable questionNumber={questionNumber} />}
    </section>
  );
}

function ConfidenceTable({ questionNumber }) {
  const q1Confidence = useStore((state) => state.q1Confidence);
  const q2Confidence = useStore((state) => state.q2Confidence);
  const q3Confidence = useStore((state) => state.q3Confidence);
  const q4Confidence = useStore((state) => state.q4Confidence);
  const q5Confidence = useStore((state) => state.q5Confidence);
  const q6Confidence = useStore((state) => state.q6Confidence);
  const confidence = useMemo(() => {
    switch (questionNumber) {
      case 1:
        return q1Confidence;
      case 2:
        return q2Confidence;
      case 3:
        return q3Confidence;
      case 4:
        return q4Confidence;
      case 5:
        return q5Confidence;
      case 6:
        return q6Confidence;
      default:
        return null;
    }
  }, [
    questionNumber,
    q1Confidence,
    q2Confidence,
    q3Confidence,
    q4Confidence,
    q5Confidence,
    q6Confidence,
  ]);
  const setQ1Confidence = useStore((state) => state.setQ1Confidence);
  const setQ2Confidence = useStore((state) => state.setQ2Confidence);
  const setQ3Confidence = useStore((state) => state.setQ3Confidence);
  const setQ4Confidence = useStore((state) => state.setQ4Confidence);
  const setQ5Confidence = useStore((state) => state.setQ5Confidence);
  const setQ6Confidence = useStore((state) => state.setQ6Confidence);
  const handleConfidenceChange = (e) => {
    const { value } = e.target;
    switch (questionNumber) {
      case 1:
        setQ1Confidence(value);
        break;
      case 2:
        setQ2Confidence(value);
        break;
      case 3:
        setQ3Confidence(value);
        break;
      case 4:
        setQ4Confidence(value);
        break;
      case 5:
        setQ5Confidence(value);
        break;
      case 6:
        setQ6Confidence(value);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <p>
        On a scale from 1 (low) to 5 (high), how confident are you in your
        answer?
      </p>
      <table className="survey-table quiz-table">
        <tbody>
          <tr>
            {[1, 2, 3, 4, 5].map((number) => (
              <td>
                <label key={number} className="confidenceLabel">
                  <input
                    type="radio"
                    name={`q${questionNumber}-confidence`}
                    value={number}
                    onChange={handleConfidenceChange}
                  />
                  {number}
                </label>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Quiz;
