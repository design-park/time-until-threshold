import React, { useCallback, useState } from "react";
import { useStore } from "../store";

// step is "pre" or "post"
function Willingness({ step }) {
  // State to store the selected values for each question
  const [societalWillingness, setSocietalWillingness] = useState({
    societal1: null,
    societal2: null,
    societal3: null,
    societal4: null,
    societal5: null,
    societal6: null,
    societal7: null,
  });

  const [personalWillingness, setPersonalWillingness] = useState({
    personal1: null,
    personal2: null,
    personal3: null,
    personal4: null,
    personal5: null,
    personal6: null,
  });

  const [advocacyIndex, setAdvocacyIndex] = useState({
    advocacy1: null,
    advocacy2: null,
    advocacy3: null,
    advocacy4: null,
  });

  const storeWillingnessInfo = useStore((state) => state.storeWillingnessInfo);

  const handleSubmit = useCallback(
    (e) => {
      console.log("Submitting willingness data", {
        step,
        societalWillingness,
        personalWillingness,
        advocacyIndex,
      });
      storeWillingnessInfo(
        step,
        societalWillingness.societal1,
        societalWillingness.societal2,
        societalWillingness.societal3,
        societalWillingness.societal4,
        societalWillingness.societal5,
        societalWillingness.societal6,
        societalWillingness.societal7,
        personalWillingness.personal1,
        personalWillingness.personal2,
        personalWillingness.personal3,
        personalWillingness.personal4,
        personalWillingness.personal5,
        personalWillingness.personal6,
        advocacyIndex.advocacy1,
        advocacyIndex.advocacy2,
        advocacyIndex.advocacy3,
        advocacyIndex.advocacy4
      );
    },
    [
      societalWillingness,
      personalWillingness,
      advocacyIndex,
      storeWillingnessInfo,
    ]
  );

  // Handler for changing radio button values
  const handleChange = (e, section) => {
    const { name, value } = e.target;
    if (section === "societal") {
      setSocietalWillingness((prev) => ({ ...prev, [name]: parseInt(value) }));
    } else if (section === "personal") {
      setPersonalWillingness((prev) => ({ ...prev, [name]: parseInt(value) }));
    } else if (section === "advocacy") {
      setAdvocacyIndex((prev) => ({ ...prev, [name]: parseInt(value) }));
    }
  };

  // Common options for the Likert scale for Willingness (4-point)
  const likertOptions = [
    { value: 1, label: "Not at all willing" },
    { value: 2, label: "Slightly willing" },
    { value: 3, label: "Moderately willing" },
    { value: 4, label: "Very willing" },
  ];

  // Questions for Societal Willingness
  const societalQuestions = [
    { id: "societal1", text: "Increase the price of fuel for vehicles" },
    { id: "societal2", text: "Increase the price of electricity" },
    {
      id: "societal3",
      text: "Use public funds to support the development of sustainable technologies such as renewable energy sources",
    },
    {
      id: "societal4",
      text: "Limit the amount of greenhouse gases that companies can produce each year without paying penalties (even if it means prices for some consumer goods will increase)",
    },
    {
      id: "societal5",
      text: "Use public funds to give rebates to households that install solar and other renewable energy devices",
    },
    {
      id: "societal6",
      text: "Use public funds to support scientific research on the causes and consequences of climate change",
    },
    {
      id: "societal7",
      text: "Raise taxes to fund the development of technology to ensure the majority of energy comes from renewable sources by the year 2030",
    },
  ];

  // Questions for Personal Willingness
  const personalQuestions = [
    {
      id: "personal1",
      text: "Pay more for fuel and use my vehicle less often",
    },
    { id: "personal2", text: "Pay more for and use less electricity" },
    {
      id: "personal3",
      text: "Pay a higher price for consumer goods from companies with good environmental records",
    },
    {
      id: "personal4",
      text: "Buy more expensive electrical appliances that have better energy-efficient ratings rather than equivalent cheaper appliances",
    },
    {
      id: "personal5",
      text: "Increase the number of times that I use public transportation, walk or cycle each week",
    },
    {
      id: "personal6",
      text: "Pay to offset the carbon emissions from my airplane flights to reduce carbon emissions",
    },
  ];

  // Questions for Advocacy Index
  const advocacyQuestions = [
    {
      id: "advocacy1",
      text: "Make donations to environmental groups, who lobby politicians to reduce our nation's contributions to global warming",
    },
    {
      id: "advocacy2",
      text: "Support a political candidate based on their commitment to climate change action",
    },
    {
      id: "advocacy3",
      text: "Send an email to government officials to encourage them to support policies that reduce global warming",
    },
    {
      id: "advocacy4",
      text: "Encourage your family and friends to reduce greenhouse gases and energy consumption",
    },
  ];

  return (
    <div className="centerBody">
      {/* Societal Willingness Section */}
      <section className="survey-section">
        <p className="section-description">
          For the following items, please indicate the extent to which you think
          that as a society we should be willing to take these actions:
        </p>
        <form>
          <table className="likert-table">
            <thead>
              <tr>
                <th className="table-header statement-header">Statement</th>
                {likertOptions.map((option) => (
                  <th key={option.value} className="table-header option-header">
                    {option.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {societalQuestions.map((q) => (
                <tr key={q.id}>
                  <td className="table-cell statement-cell">{q.text}</td>
                  {likertOptions.map((option) => (
                    <td
                      key={`${q.id}-${option.value}`}
                      className="table-cell radio-cell"
                    >
                      <label className="radio-label">
                        <input
                          type="radio"
                          name={q.id}
                          value={option.value}
                          checked={societalWillingness[q.id] === option.value}
                          onChange={(e) => handleChange(e, "societal")}
                          className="radio-input"
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
      <section className="survey-section">
        <p className="section-description">
          For the following items, please indicate the extent to which you would
          be willing to personally take these actions:
        </p>
        <form>
          <table className="likert-table">
            <thead>
              <tr>
                <th className="table-header statement-header">Statement</th>
                {likertOptions.map((option) => (
                  <th key={option.value} className="table-header option-header">
                    {option.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {personalQuestions.map((q) => (
                <tr key={q.id}>
                  <td className="table-cell statement-cell">{q.text}</td>
                  {likertOptions.map((option) => (
                    <td
                      key={`${q.id}-${option.value}`}
                      className="table-cell radio-cell"
                    >
                      <label className="radio-label">
                        <input
                          type="radio"
                          name={q.id}
                          value={option.value}
                          checked={personalWillingness[q.id] === option.value}
                          onChange={(e) => handleChange(e, "personal")}
                          className="radio-input"
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
      <section className="survey-section">
        <p className="section-description">
          Please indicate the extent to which you would be willing to take these
          actions:
        </p>
        <form>
          <table className="likert-table">
            <thead>
              <tr>
                <th className="table-header statement-header">Statement</th>
                {likertOptions.map((option) => (
                  <th key={option.value} className="table-header option-header">
                    {option.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {advocacyQuestions.map((q) => (
                <tr key={q.id}>
                  <td className="table-cell statement-cell">{q.text}</td>
                  {likertOptions.map((option) => (
                    <td
                      key={`${q.id}-${option.value}`}
                      className="table-cell radio-cell"
                    >
                      <label className="radio-label">
                        <input
                          type="radio"
                          name={q.id}
                          value={option.value}
                          checked={advocacyIndex[q.id] === option.value}
                          onChange={(e) => handleChange(e, "advocacy")}
                          className="radio-input"
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
            !Object.values(societalWillingness).every((val) => val) ||
            !Object.values(personalWillingness).every((val) => val) ||
            !Object.values(advocacyIndex).every((val) => val)
          }
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Willingness;
