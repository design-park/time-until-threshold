import React, { useState } from 'react';

function Demography() {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('');
  const [partyAffiliation, setPartyAffiliation] = useState('');
  const [income, setIncome] = useState('');
  const [religion, setReligion] = useState('');

  return (
    <div className="centerBody">
      <div className="main-container">
        <div className="card">
          <h4 className="instruction-text">
            Please answer the questions below to collect your demographic characteristics.
          </h4>

          <form className="space-y-6">
            {/* Gender Question */}
            <div className="form-section">
              <label htmlFor="gender" className="form-label">
                Gender:
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="0"
                    checked={gender === '0'}
                    onChange={(e) => setGender(e.target.value)}
                    className="radio-input"
                  />
                  <span className="radio-text">Male</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="1"
                    checked={gender === '1'}
                    onChange={(e) => setGender(e.target.value)}
                    className="radio-input"
                  />
                  <span className="radio-text">Female</span>
                </label>
              </div>
            </div>

            {/* Age Question */}
            <div className="form-section">
              <label htmlFor="age" className="form-label">
                Age:
              </label>
              <select
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="select-field"
              >
                <option value="">Select your age group</option>
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
                Education:
              </label>
            <select
              id="education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="select-field"
            >
              <option value="">Select your education level</option>
              <option value="1">Below Year 12</option>
              <option value="2">Year 10/11</option>
              <option value="3">Year 12/HSC</option>
              <option value="4">Advanced Diploma/TAFE</option>
              <option value="5">Bachelor's degree or equivalent</option>
              <option value="6">Graduate Diploma/Certificate</option>
              <option value="7">Master's/Doctoral degree</option>
              <option value="8">Prefer not to answer</option>
            </select>
          </div>

          {/* Party Affiliation Question */}
          <div className="form-section">
            <label htmlFor="partyAffiliation" className="form-label">
              Party Affiliation:
            </label>
            <select
              id="partyAffiliation"
              value={partyAffiliation}
              onChange={(e) => setPartyAffiliation(e.target.value)}
              className="select-field"
            >
              <option value="">Select your party affiliation</option>
              <option value="0">"conservative" (Liberal & National Coalition)</option>
              <option value="1">"liberal" (Labor Party and Australian Green Party)</option>
              <option value="2">None of the above</option>
            </select>
          </div>

          {/* Income Question */}
          <div className="form-section">
            <label htmlFor="income" className="form-label">
              Income:
            </label>
            <select
              id="income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="select-field"
            >
              <option value="">Select your income group</option>
              <option value="1">&lt;$24,999</option>
              <option value="2">$25,000 to $49,999</option>
              <option value="3">$50,000 to $74,999</option>
              <option value="4">$75,000 to $99,999</option>
              <option value="5">$100,000 to $149,999</option>
              <option value="6">$150,000 to $249,999</option>
              <option value="7">{'>'}$250,000</option>
              <option value="8">Prefer not to answer</option>
            </select>
          </div>

          {/* Religion Question */}
          <div className="form-section">
            <label htmlFor="religion" className="form-label">
              Religion:
            </label>
            <select
              id="religion"
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              className="select-field"
            >
              <option value="">Select your religion</option>
              <option value="1">Christianity</option>
              <option value="2">Islam</option>
              <option value="3">Judaism</option>
              <option value="4">Hinduism</option>
              <option value="5">Buddhism</option>
              <option value="6">Sikhism</option>
              <option value="7">Other</option>
              <option value="8">No religion</option>
              <option value="9">Prefer not to answer</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="actionButtonContainer">
            <button
              type="submit"
              className="userActionButton" disabled={true}
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
