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
          <h4 className="instruction-text">Training Phase Instructions</h4>

          <p className="subText">
            You are about to begin<strong> the training phase.</strong> This
            phase is designed to guide you step by step through a training
            visualization, helping you become familiar with how this type of
            graph works. At each step, you may be asked to complete a short quiz
            on the monitor to check your understanding.
          </p>

          <p className="subText">
            If you answer incorrectly, the researcher may guide you through the
            process again. However, if you continue to answer incorrectly, we
            may ask you to return your submission.
          </p>

          <p className="subText">
            You should now have received <strong> an information sheet</strong>{" "}
            that provides a
            <strong> brief overview of SSP-RCP scenarios.</strong> This sheet
            will help you understand certain elements that appear in the
            visualization.
            <strong> Please read it carefully before proceeding.</strong> You
            may keep and refer to the sheet at any time during the experiment.
          </p>

          <p className="subText">
            You are encouraged to refer to the information sheet whenever needed
            while interacting with the visualization and answering the quiz
            questions.
          </p>

          <p className="subText">
            After the training phase, you will move on to the
            <strong> main part of the experiment</strong>, where you will
            interact with a similar type of visualization.
          </p>

          <label className="checkBox">
            I have read and understood the instructions above and reviewed the
            information sheet. I’m ready to proceed with the training phase.
            <input
              type="checkbox"
              name="confirmCheckbox"
              onClick={() => {
                setConfirmChecked(!confirmChecked);
              }}
            />
          </label>

          <button
            className="userActionButton rightButton"
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
