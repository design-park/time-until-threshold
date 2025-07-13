import React, { useState } from "react";
import { useStore } from "../store";

function TempDistance({ step }) {
  // State to store the selected values for each question
  const [temporalResponses, setTemporalResponses] = useState({
    question1: null,
    question2: null,
  });
  console.log(temporalResponses);

  const storeTempDistanceInfo = useStore(
    (state) => state.storeTempDistanceInfo
  );

  // Handler for changing radio button values
  const handleChange = (e) => {
    const { name, value } = e.target; // Use 'name' for radio buttons to identify the question
    setTemporalResponses((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleSubmit = (e) => {
    storeTempDistanceInfo(
      step,
      temporalResponses.question1,
      temporalResponses.question2
    );
  };

  // Common options for the seven-point Likert scale
  const likertOptions = [
    { value: 1, label: "Strongly disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Slightly disagree" },
    { value: 4, label: "Neither agree nor disagree" },
    { value: 5, label: "Slightly agree" },
    { value: 6, label: "Agree" },
    { value: 7, label: "Strongly agree" },
  ];

  // Questions for the survey
  const questions = [
    {
      id: "question1",
      text: "1. It will be a long time before the consequences of climate change are felt.",
    },
    {
      id: "question2",
      text: "2. The consequences of climate change will only be experienced in the far future.",
    },
  ];

  return (
    <div className="centerBody">
      <div className="survey-section">
        <p className="survey-description">
          Please indicate the extent to which you agree or disagree with the
          following statements:
        </p>

        <section>
          <form>
            <table className="survey-table">
              <thead>
                <tr>
                  <th>Statement</th>
                  {likertOptions.map((option) => (
                    <th key={option.value}>{option.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {questions.map((q) => (
                  <tr key={q.id}>
                    <td>{q.text}</td>
                    {likertOptions.map((option) => (
                      <td key={`${q.id}-${option.value}`}>
                        <label className="likert-radio-label">
                          <input
                            type="radio"
                            name={q.id} // Use question id as name for radio group
                            value={option.value}
                            checked={temporalResponses[q.id] === option.value}
                            onChange={handleChange}
                            className="likert-radio-input"
                          />
                        </label>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </section>
        <div className="buttonContainer">
          <button
            className="userActionButton"
            onClick={handleSubmit}
            disabled={
              !temporalResponses.question1 || !temporalResponses.question2
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default TempDistance;
