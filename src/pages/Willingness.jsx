import React, { useState } from "react";

function Willingness() {
  // State to store the selected values for each question
  const [societalWillingness, setSocietalWillingness] = useState({
    societal1: "",
    societal2: "",
    societal3: "",
    societal4: "",
    societal5: "",
    societal6: "",
    societal7: "",
  });

  const [personalWillingness, setPersonalWillingness] = useState({
    personal1: "",
    personal2: "",
    personal3: "",
    personal4: "",
    personal5: "",
    personal6: "",
  });

  const [advocacyIndex, setAdvocacyIndex] = useState({
    advocacy1: "",
    advocacy2: "",
    advocacy3: "",
    advocacy4: "",
  });

  // Handler for changing radio button values
  const handleChange = (e, section) => {
    const { name, value } = e.target;
    if (section === "societal") {
      setSocietalWillingness((prev) => ({ ...prev, [name]: value }));
    } else if (section === "personal") {
      setPersonalWillingness((prev) => ({ ...prev, [name]: value }));
    } else if (section === "advocacy") {
      setAdvocacyIndex((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Common options for the Likert scale for Willingness (4-point)
  const likertOptions = [
    { value: "1", label: "Not at all willing" },
    { value: "2", label: "Slightly willing" },
    { value: "3", label: "Moderately willing" },
    { value: "4", label: "Very willing" },
  ];

  // Questions for Societal Willingness
  const societalQuestions = [
    { id: "societal1", text: "Increase the price of fuel for vehicles" },
    { id: "societal2", text: "Increase the price of electricity" },
    { id: "societal3", text: "Use public funds to support the development of sustainable technologies such as renewable energy sources" },
    { id: "societal4", text: "Limit the amount of greenhouse gases that companies can produce each year without paying penalties (even if it means prices for some consumer goods will increase)" },
    { id: "societal5", text: "Use public funds to give rebates to households that install solar and other renewable energy devices" },
    { id: "societal6", text: "Use public funds to support scientific research on the causes and consequences of climate change" },
    { id: "societal7", text: "Raise taxes to fund the development of technology to ensure the majority of energy comes from renewable sources by the year 2030" },
  ];

  // Questions for Personal Willingness
  const personalQuestions = [
    { id: "personal1", text: "Pay more for fuel and use my vehicle less often" },
    { id: "personal2", text: "Pay more for and use less electricity" },
    { id: "personal3", text: "Pay a higher price for consumer goods from companies with good environmental records" },
    { id: "personal4", text: "Buy more expensive electrical appliances that have better energy-efficient ratings rather than equivalent cheaper appliances" },
    { id: "personal5", text: "Increase the number of times that I use public transportation, walk or cycle each week" },
    { id: "personal6", text: "Pay to offset the carbon emissions from my airplane flights to reduce carbon emissions" },
  ];

  // Questions for Advocacy Index
  const advocacyQuestions = [
    { id: "advocacy1", text: "Make donations to environmental groups, who lobby politicians to reduce our nation's contributions to global warming" },
    { id: "advocacy2", text: "Support a political candidate based on their commitment to climate change action" },
    { id: "advocacy3", text: "Send an email to government officials to encourage them to support policies that reduce global warming" },
    { id: "advocacy4", text: "Encourage your family and friends to reduce greenhouse gases and energy consumption" },
  ];

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '900px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Behavioural Willingness Survey</h2>
      <p style={{ textAlign: 'center', marginBottom: '30px', color: '#555' }}>
        Please indicate the extent to which you would be willing to take the following actions.
      </p>

      {/* Societal Willingness Section */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '15px', color: '#444' }}>Societal Willingness</h3>
        <p style={{ marginBottom: '20px', color: '#555' }}>
          For the following items, please indicate the extent to which you think that as a society we should be
          willing to take these actions:
        </p>
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
              {societalQuestions.map((q) => (
                <tr key={q.id}>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{q.text}</td>
                  {likertOptions.map((option) => (
                    <td key={`${q.id}-${option.value}`} style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                      <label style={{ cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name={q.id}
                          value={option.value}
                          checked={societalWillingness[q.id] === option.value}
                          onChange={(e) => handleChange(e, 'societal')}
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

      {/* Personal Willingness Section */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '15px', color: '#444' }}>Personal Willingness</h3>
        <p style={{ marginBottom: '20px', color: '#555' }}>
          For the following items, please indicate the extent to which you would be willing to personally take
          these actions:
        </p>
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
              {personalQuestions.map((q) => (
                <tr key={q.id}>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{q.text}</td>
                  {likertOptions.map((option) => (
                    <td key={`${q.id}-${option.value}`} style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                      <label style={{ cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name={q.id}
                          value={option.value}
                          checked={personalWillingness[q.id] === option.value}
                          onChange={(e) => handleChange(e, 'personal')}
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

      {/* Advocacy Index Section */}
      <section>
        <h3 style={{ marginBottom: '15px', color: '#444' }}>Advocacy Index</h3>
        <p style={{ marginBottom: '20px', color: '#555' }}>
          Please indicate the extent to which you would be willing to take these actions:
        </p>
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
              {advocacyQuestions.map((q) => (
                <tr key={q.id}>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{q.text}</td>
                  {likertOptions.map((option) => (
                    <td key={`${q.id}-${option.value}`} style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                      <label style={{ cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name={q.id}
                          value={option.value}
                          checked={advocacyIndex[q.id] === option.value}
                          onChange={(e) => handleChange(e, 'advocacy')}
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
          {JSON.stringify({ societalWillingness, personalWillingness, advocacyIndex }, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default Willingness;
