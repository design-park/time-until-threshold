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
          The following questions designed to see how much you{" "}
          <strong> remember</strong> about
          <strong>
            {" "}
            “the global surface temperature change relative to 1850-1900”
          </strong>
          , which is the <strong>second</strong> line graph we showed you during
          the experiment. The chart illustrated observed (1950-2024) and
          projected (2025-2099) global surface temperature changes relative to
          the 1850-1900 baseline. The projections are based on 5 different
          greenhouse gas emission scenarios:
        </p>
        <ul>
          <li className="veryLowColor">SSP1-1.9 (Very low emissions)</li>
          <li className="lowColor">SSP1-2.6 (Low emissions)</li>
          <li className="intermediateColor">
            SSP2-4.5 (Intermediate emissions)
          </li>
          <li className="highColor">SSP3-7.0 (High emissions)</li>
          <li className="veryHighColor">SSP5-8.5 (Very high emissions)</li>
        </ul>
        <p>
          The graph also illustrated the years we have left to reach 3
          thresholds which are:<strong> 1.5°C, 2.0°C, and 4.0°C</strong>.
        </p>
        <p>
          Try to answer as best as you can the following questions. If you don’t
          remember at all, you can choose “I have no idea”. If you have chosen
          the answer, please rate your certainty level as well.
        </p>
      </section>
      <form>
        <NumberQuestion
          questionNumber={1}
          question={
            <>
              Try to remember in how many years from this year (2025) the{" "}
              <span className="veryHighColor">
                {" "}
                SSP5-8.5 (Very high emissions scenario)
              </span>{" "}
              will reach the <strong>1.5°C</strong> threshold. If you're not
              sure, give the closest estimate you can.
            </>
          }
          textBeforeInput="In"
          textAfterInput="years"
        />

        <NumberQuestion
          questionNumber={2}
          question={
            <>
              Try to remember in how many years from this year (2025) the{" "}
              <span className="veryHighColor">
                {" "}
                SSP5-8.5 (Very high emissions scenario)
              </span>{" "}
              will reach the <strong>2.0°C</strong> threshold. If you're not
              sure, give the closest estimate you can.
            </>
          }
          textBeforeInput="In"
          textAfterInput="years"
        />

        <NumberQuestion
          questionNumber={3}
          question={
            <>
              Try to remember in how many years from this year (2025) the{" "}
              <span className="veryHighColor">
                {" "}
                SSP5-8.5 (Very high emissions scenario)
              </span>{" "}
              will reach the <strong>4.0°C</strong> threshold. If you're not
              sure, give the closest estimate you can.
            </>
          }
          textBeforeInput="In"
          textAfterInput="years"
        />

        <NumberQuestion
          questionNumber={4}
          question={
            <>
              The graph used{" "}
              <mark className="yellowBoxColor">a yellow-shaded box</mark> to
              represent the <strong>6-year gap</strong> between the first and
              last scenarios that reached the <strong>1.5°C</strong> threshold.
              Using that as a reference for your memory, what was the year
              difference between the first and last scenarios that reached the{" "}
              <strong>2.0°C</strong> threshold, as shown by the width of{" "}
              <mark className="orangeBoxColor">the orange-shaded box</mark>? If
              you're unsure, give your best estimate.
            </>
          }
          textBeforeInput=""
          textAfterInput="years"
        />

        <NumberQuestion
          questionNumber={5}
          question={
            <>
              The graph used{" "}
              <mark className="yellowBoxColor">a yellow-shaded box</mark> to
              represent the <strong>6-year gap</strong> between the first and
              last scenarios that reached the <strong>1.5°C</strong> threshold.
              Using that as a reference for your memory, what was the year
              difference between the first and last scenarios that reached the{" "}
              <strong>4.0°C</strong> threshold, as shown by the width of{" "}
              <mark className="redBoxColor">the red-shaded box</mark>? If
              you're unsure, give your best estimate.
            </>
          }
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
        I have no idea
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
  ]);
  const setQ1Confidence = useStore((state) => state.setQ1Confidence);
  const setQ2Confidence = useStore((state) => state.setQ2Confidence);
  const setQ3Confidence = useStore((state) => state.setQ3Confidence);
  const setQ4Confidence = useStore((state) => state.setQ4Confidence);
  const setQ5Confidence = useStore((state) => state.setQ5Confidence);
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
