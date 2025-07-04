import React, { useState } from 'react';

function TemporalDistance() {
  // State to store the selected values for each question
  const [temporalResponses, setTemporalResponses] = useState({
    question1: '',
    question2: '',
  });

  // Handler for changing radio button values
  const handleChange = (e) => {
    const { name, value } = e.target; // Use 'name' for radio buttons to identify the question
    setTemporalResponses((prev) => ({ ...prev, [name]: value }));
  };

  // Common options for the seven-point Likert scale
  const likertOptions = [
    { value: '1', label: 'Strongly disagree' },
    { value: '2', label: 'Disagree' },
    { value: '3', label: 'Slightly disagree' },
    { value: '4', label: 'Neither agree nor disagree' },
    { value: '5', label: 'Slightly agree' },
    { value: '6', label: 'Agree' },
    { value: '7', label: 'Strongly agree' },
  ];

  // Questions for the survey
  const questions = [
    { id: 'question1', text: '1. It will be a long time before the consequences of climate change are felt.' },
    { id: 'question2', text: '2. The consequences of climate change will only be experienced in the far future.' },
  ];

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Temporal Distance Survey</h2>
      <p style={{ textAlign: 'center', marginBottom: '30px', color: '#555' }}>
        Please indicate the extent to which you agree or disagree with the following statements:
      </p>

      <section>
        <h3 style={{ marginBottom: '15px', color: '#444' }}>Perception of Temporal Distance</h3>
        <form>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left', minWidth: '250px' }}>Statement</th>
                {likertOptions.map((option) => (
                  <th key={option.value} style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontSize: '0.85em' }}>
                    {option.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.id}>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{q.text}</td>
                  {likertOptions.map((option) => (
                    <td key={`${q.id}-${option.value}`} style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                      <label style={{ cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name={q.id} // Use question id as name for radio group
                          value={option.value}
                          checked={temporalResponses[q.id] === option.value}
                          onChange={handleChange}
                          style={{ margin: '0', cursor: 'pointer' }}
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

      {/* Optional: Display current selections for debugging/review */}
      <div style={{ marginTop: '40px', padding: '15px', border: '1px solid #eee', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
        <h4 style={{ marginBottom: '10px', color: '#666' }}>Current Selections:</h4>
        <pre style={{ backgroundColor: '#eef', padding: '10px', borderRadius: '4px', overflowX: 'auto' }}>
          {JSON.stringify(temporalResponses, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default TemporalDistance;
