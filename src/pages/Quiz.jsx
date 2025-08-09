import { useEffect, useMemo, useState } from "react";
import { useStore } from "../store";

const useAnswer = (number) => {
  const q1Answer = useStore((state) => state.q1Answer);
  const q2Answer = useStore((state) => state.q2Answer);
  const q3Answer = useStore((state) => state.q3Answer);
  const q4Answer = useStore((state) => state.q4Answer);
  const q5Answer = useStore((state) => state.q5Answer);

  switch (number) {
    case 1:
      return q1Answer;
    case 2:
      return q2Answer;
    case 3:
      return q3Answer;
    case 4:
      return q4Answer;
    case 5:
      return q5Answer;
    default:
      return null;
  }
};

const useSetAnswer = (number) => {
  const setQ1Answer = useStore((state) => state.setQ1Answer);
  const setQ2Answer = useStore((state) => state.setQ2Answer);
  const setQ3Answer = useStore((state) => state.setQ3Answer);
  const setQ4Answer = useStore((state) => state.setQ4Answer);
  const setQ5Answer = useStore((state) => state.setQ5Answer);

  const parseAnswer = (value) => {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? null : parsedValue;
  };

  switch (number) {
    case 1:
      return (value) => setQ1Answer(parseAnswer(value));
    case 2:
      return (value) => setQ2Answer(parseAnswer(value));
    case 3:
      return (value) => setQ3Answer(parseAnswer(value));
    case 4:
      return (value) => setQ4Answer(parseAnswer(value));
    case 5:
      return (value) => setQ5Answer(parseAnswer(value));
    default:
      return () => {};
  }
};

const useConfidence = (number) => {
  const q1Confidence = useStore((state) => state.q1Confidence);
  const q2Confidence = useStore((state) => state.q2Confidence);
  const q3Confidence = useStore((state) => state.q3Confidence);
  const q4Confidence = useStore((state) => state.q4Confidence);
  const q5Confidence = useStore((state) => state.q5Confidence);

  switch (number) {
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
};

const useSetConfidence = (number) => {
  const setQ1Confidence = useStore((state) => state.setQ1Confidence);
  const setQ2Confidence = useStore((state) => state.setQ2Confidence);
  const setQ3Confidence = useStore((state) => state.setQ3Confidence);
  const setQ4Confidence = useStore((state) => state.setQ4Confidence);
  const setQ5Confidence = useStore((state) => state.setQ5Confidence);

  switch (number) {
    case 1:
      return setQ1Confidence;
    case 2:
      return setQ2Confidence;
    case 3:
      return setQ3Confidence;
    case 4:
      return setQ4Confidence;
    case 5:
      return setQ5Confidence;
    default:
      return () => {};
  }
};

function Quiz() {
  const setQuizCompleted = useStore((state) => state.setQuizCompleted);
  const storeEndTimestamp = useStore((state) => state.storeEndTimestamp);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    document.querySelector(".content").scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    storeEndTimestamp();
    setQuizCompleted(true);
  };

  return (
    <div className="centerBody">
      <section className="survey-section">
        <h1>Last Part — Quiz Instructions</h1>
        <p>
          You’ve reached the final part of the experiment. In this section, we
          will like to ask you how much you <strong> remember</strong> about the
          second graph we showed you during the experiment, which was
          <strong>
            {" "}
            “the global surface temperature change relative to 1850-1900”
          </strong>
        </p>
        <p>The chart included:</p>
        <ul>
          <li>
            <strong>Observed data</strong> (1950-2024)
          </li>
          <li>
            <strong>Projected data</strong> (2025-2099) under five emission
            scenarios
          </li>
          <ul>
            <li className="veryLowColor">SSP1-1.9 (Very low emissions)</li>
            <li className="lowColor">SSP1-2.6 (Low emissions)</li>
            <li className="intermediateColor">
              SSP2-4.5 (Intermediate emissions)
            </li>
            <li className="highColor">SSP3-7.0 (High emissions)</li>
            <li className="veryHighColor">SSP5-8.5 (Very high emissions)</li>
          </ul>
          <li>
            Estimated years remaining until the world reaches
            <strong> 1.5°C, 2.0°C, and 4.0°C</strong> of warming.
          </li>
        </ul>

        <h1>What to do</h1>
        <ol>
          <li>
            Answer each question about the graph as accurately as you can.
            <ul>
              <li>
                If you don't remember, choose <strong>"I have no idea."</strong>
              </li>
            </ul>
          </li>
          <li>
            After each answer, <strong>rate your certainty</strong> on a 1 – 5
            scale.
          </li>
        </ol>
      </section>
      <form onSubmit={handleSubmit}>
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
              <strong>2.0°C</strong> threshold, as shown by the year range of{" "}
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
              <strong>4.0°C</strong> threshold, as shown by the year range of{" "}
              <mark className="redBoxColor">the red-shaded box</mark>? If you're
              unsure, give your best estimate.
            </>
          }
          textBeforeInput="More than"
          textAfterInput="years"
        />

        <div className="actionButtonContainer">
          <button className="userActionButton" type="submit">
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
  const answer = useAnswer(questionNumber);
  const setAnswer = useSetAnswer(questionNumber);
  const setConfidence = useSetConfidence(questionNumber);
  const [dontKnow, setDontKnow] = useState(false);
  const handleDontKnowChange = (e) => {
    setDontKnow(e.target.checked);
    setAnswer(null);
    setConfidence(null);
  };
  return (
    <section className="survey-section">
      <h2 className="quiz-question">Question {questionNumber}</h2>
      <p>{question}</p>
      <p>
        {textBeforeInput}{" "}
        <input
          id={`q${questionNumber}-answer`}
          name={`q${questionNumber}-answer`}
          type="number"
          min="0"
          value={answer == null ? "" : answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={dontKnow}
          required={!dontKnow}
        />{" "}
        {textAfterInput}
      </p>
      <label htmlFor={`q${questionNumber}-dont-know`}>
        <input
          type="checkbox"
          id={`q${questionNumber}-dont-know`}
          name={`q${questionNumber}-dont-know`}
          checked={dontKnow}
          onChange={handleDontKnowChange}
        />{" "}
        I have no idea
      </label>
      {answer != null && answer !== "" && (
        <ConfidenceTable questionNumber={questionNumber} />
      )}
    </section>
  );
}

function ConfidenceTable({ questionNumber }) {
  const confidence = useConfidence(questionNumber);
  const setConfidence = useSetConfidence(questionNumber);
  const handleConfidenceChange = (e) => {
    setConfidence(parseInt(e.target.value));
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
                    required
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
