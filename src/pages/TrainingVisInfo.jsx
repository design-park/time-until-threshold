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
            Please be prepared to focus on interacting with the visualization in
            the next step.
          </h4>

          <h4 className="titleText">Before the next step:</h4>
          <p className="subText">
            You have received <strong> an information sheet</strong> that
            provides a<strong> brief overview of SSP-RCP scenarios.</strong>{" "}
            This sheet is meant to help you understand the type of visualization
            you will see.
            <strong>Please read it carefully before proceeding.</strong> You may
            keep the sheet until the end of the experiment, but you are
            <strong> not allowed to take notes</strong> on it.
          </p>

          <h4 className="titleText">During the next step:</h4>
          <p className="subText">
            The next step is<strong> a training phase.</strong> You will
            interact with a training visualization designed to help you get
            familiar with how this type of visualization works. During this
            phase, you will also receive a <strong>quiz sheet</strong>
            that checks your understanding of the visualization.
          </p>
          <p className="subText">
            You are welcome to refer to the<strong> information sheet</strong>{" "}
            at any time while interacting with the visualization and answering
            the quiz.
          </p>
          <p className="subText">
            A timer will be running. It is not to limit your time, but to ensure
            you spend at least a minimum amount of time engaging with the
            visualization.
          </p>
          <p className="subText">
            ⚠️<strong> Important</strong>: Once you complete the quiz, the
            researcher will check your answers. If your responses show
            sufficient understanding, you will receive a code to unlock the next
            step of the experiment. If not, you will be asked to review the
            training visualization again with the help from the researcher.
          </p>
          <p className="subText">
            The next step after training will involve interacting with the
            <strong> target visualization</strong>, which is the main part of
            the experiment.
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
