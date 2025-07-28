import { useState } from "react";
import { useStore } from "../store";

function TrainingVisInfo() {
  let [confirmChecked, setConfirmChecked] = useState(false);
  const setTrainingVisInfoSeen = useStore(
    (state) => state.setTrainingVisInfoSeen
  );

  const handleSubmit = () => {
    setTrainingVisInfoSeen(true);
  };

  return (
    <div className="centerBody">
      <div className="main-container">
        <div className="card">
          <h4 className="instruction-text">
            Please ask the researcher to provide you with the information sheet.
          </h4>

          <h4 className="titleText">What you will read:</h4>
          <p className="subText">
            The information sheet is here to support your understanding the
            visualization you will see at the next step.
          </p>

          <h4 className="titleText">When to read:</h4>
          <p className="subText">
            Before going to the next step, please read what is written on the
            paper. At the next step, you will interact with the visualization.
            You are also allowed to read the sheet during this step if needed.
          </p>

          <label className="checkBox">
            I have well understood the instruction above and read the
            information sheet.
            <input
              type="checkbox"
              name="confirmCheckbox"
              onClick={() => {
                setConfirmChecked(!confirmChecked);
              }}
            />
          </label>

          <button
            className="userActionButton"
            disabled={!confirmChecked}
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default TrainingVisInfo;
