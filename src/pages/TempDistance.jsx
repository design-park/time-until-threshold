import React, { useState } from "react";

function TempDistance() {
  // State to store the selected values for each question
  const [temporalResponses, setTemporalResponses] = useState({
    question1: "",
    question2: "",
  });

  // Handler for changing radio button values
  const handleChange = (e) => {
    const { name, value } = e.target; // Use 'name' for radio buttons to identify the question
    setTemporalResponses((prev) => ({ ...prev, [name]: value }));
  };

  // Common options for the seven-point Likert scale
  const likertOptions = [
    { value: "1", label: "Strongly disagree" },
    { value: "2", label: "Disagree" },
    { value: "3", label: "Slightly disagree" },
    { value: "4", label: "Neither agree nor disagree" },
    { value: "5", label: "Slightly agree" },
    { value: "6", label: "Agree" },
    { value: "7", label: "Strongly agree" },
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
    <div className="tempDistanceBody">
      <div className="survey-container">
        <h2 className="survey-title">Temporal Distance Survey</h2>
        <p className="survey-description">
          Please indicate the extent to which you agree or disagree with the
          following statements:
        </p>

        <section>
          <h3 className="section-title">Perception of Temporal Distance</h3>
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
      </div>
    </div>
  );
}

export default TempDistance;
