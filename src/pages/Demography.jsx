import React, { useState } from "react";
import { useStore } from "../store";

function Demography() {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [education, setEducation] = useState("");
  const [scienceKnowledge, setscienceKnowledge] = useState("");
  const [engageFrequency, setengageFrequency] = useState("");
  const [lineGraphConfidency, setlineGraphConfidency] = useState("");
  const storeDemographicInfo = useStore((state) => state.storeDemographicInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
    storeDemographicInfo(
      gender,
      age,
      education,
      scienceKnowledge,
      engageFrequency,
      lineGraphConfidency
    );
  };

  const isFormComplete =
    gender &&
    age &&
    education &&
    scienceKnowledge &&
    engageFrequency &&
    lineGraphConfidency;

  return (
    <div className="centerBody">
      <div className="main-container">
        <div className="card">
          <h4 className="instruction-text">
            Please answer the questions below to collect your demographic
            characteristics.
          </h4>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Gender Question */}
            <div className="form-section">
              <label htmlFor="gender" className="form-label">
                1. What is your gender?
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                    className="radio-input"
                  />
                  <span className="radio-text">Male</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                    className="radio-input"
                  />
                  <span className="radio-text">Female</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={gender === "other"}
                    onChange={(e) => setGender(e.target.value)}
                    className="radio-input"
                  />
                  <span className="radio-text">Other / Prefer not to say</span>
                </label>
              </div>
            </div>

            {/* Age Question */}
            <div className="form-section">
              <label htmlFor="age" className="form-label">
                2. What is your age group?
              </label>
              <select
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="select-field"
              >
                <option value="">No selection</option>
                <option value="1">18-24</option>
                <option value="2">25-34</option>
                <option value="3">35-44</option>
                <option value="4">45-54</option>
                <option value="5">55-65</option>
                <option value="6">65+</option>
              </select>
            </div>

            {/* Education Question */}
            <div className="form-section">
              <label htmlFor="education" className="form-label">
                3. What is the highest level of education you have completed or
                are currently pursuing?
              </label>
              <select
                id="education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="select-field"
              >
                <option value="">No selection</option>
                <option value="1">Less than High School</option>
                <option value="2">
                  Higher Education less than Bachelor's Degree
                </option>
                <option value="3">Bachelor's Degree</option>
                <option value="4">Master's Degree</option>
                <option value="5">Doctorate or Professional Degree</option>
                <option value="8">Prefer not to answer</option>
              </select>
            </div>

            {/* Climate Change Science Knowledge Question */}
            <div className="form-section">
              <label htmlFor="scienceKnowledge" className="form-label">
                4. How would you rate your overall knowledge and understanding
                of climate change science?
              </label>
              <select
                id="scienceKnowledge"
                value={scienceKnowledge}
                onChange={(e) => setscienceKnowledge(e.target.value)}
                className="select-field"
              >
                <option value="">No selection</option>
                <option value="0">No knowledge/understanding</option>
                <option value="1">Limited Knowledge/understanding</option>
                <option value="2">Moderate knowledge/understanding</option>
                <option value="3">Good knowledge/understanding</option>
                <option value="4">Expert knowledge/understanding</option>
              </select>
            </div>

            {/* Engage Frequency Question */}
            <div className="form-section">
              <label htmlFor="engageFrequency" className="form-label">
                5. How frequently do you seek information or engage with
                discussions related to climate change (e.g., news, scientific
                articles, documentaries, conversations)?
              </label>
              <select
                id="engageFrequency"
                value={engageFrequency}
                onChange={(e) => setengageFrequency(e.target.value)}
                className="select-field"
              >
                <option value="">No selection</option>
                <option value="1">Never</option>
                <option value="2">Rarely (less than once a month)</option>
                <option value="3">Occasionally (a few times a month)</option>
                <option value="4">Frequently (a few times a week)</option>
                <option value="5">Very Frequently (daily)</option>
              </select>
            </div>

            {/* Confidency in Line Graphs */}
            <div className="form-section">
              <label htmlFor="lineGraphConfidency" className="form-label">
                6. How confident are you in interpreting line graphs?
              </label>
              <select
                id="lineGraphConfidency"
                value={lineGraphConfidency}
                onChange={(e) => setlineGraphConfidency(e.target.value)}
                className="select-field"
              >
                <option value="">No selection</option>
                <option value="1">Not confident at all</option>
                <option value="2">Slightly confident</option>
                <option value="3">Moderately confident</option>
                <option value="4">Confident</option>
                <option value="5">Very Confident</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="actionButtonContainer">
              <button
                type="submit"
                className="userActionButton"
                disabled={!isFormComplete}
              >
                Submit Demographics
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Demography;
