import { useState } from "react";
import { useStore } from "../store";

function TargetVisInfo() {
  let [confirmChecked, setConfirmChecked] = useState(false);
  const setTargetVisInfoSeen = useStore((state) => state.setTargetVisInfoSeen);

  const handleSubmit = () => {
    setTargetVisInfoSeen(true);
  };

  return (
    <div className="centerBody">
      <div className="main-container">
        <div className="card">
          <h4 className="instruction-text">Instruction for the Main Task</h4>
          <p className="subText">
            You are now entering the <strong>main part</strong> of the
            experiment. The visualization format is similar to the training one,
            but the
            <strong> subject has changed</strong>. Instead of showing
            <em> global mean sea level change</em>, the new graph presents
            <strong> global surface temperature trends</strong>.
          </p>

          <p className="subText">Here is what you will be expected to do:</p>

          <ul>
            <li>
              Interact with a <strong>line graph visualization</strong>.
            </li>
            <li>
              Complete a <strong>quiz sheet</strong> based on the visualization.
            </li>
            <li>
              <strong>Additional writing session</strong> related to the
              visualization.
            </li>
          </ul>

          <p className="subText">
            Please note that you may be prevented from proceeding to the next
            step immediately. It is intentional that you spend adequate time
            engaging with the visualization and fully understand the
            information.
          </p>

          <p className="subText">
            To support your understanding, you now have access to{" "}
            <strong>two information sheets</strong>:
          </p>
          <ul>
            <li>
              <strong>Sheet 1</strong> (from the training phase): A brief
              overview of <em>SSP-RCP scenarios</em>.
            </li>
            <li>
              <strong>Sheet 2</strong> (new): Information on how{" "}
              <em>
                climate extremes intensify and occur more frequently with each
                additional increment of global warming.
              </em>
              .
            </li>
          </ul>

          <p className="subText">
            You are encouraged to{" "}
            <strong>refer to both information sheets</strong>. You are
            encouraged to refer to both sheets during your work with the
            visualization and while answering the quiz and writing tasks.
          </p>

          <p className="subText">
            Please take a moment to review the information sheets before
            continuing. You may also refer to them during the next steps.
          </p>

          <label className="checkBox">
            I have understood the instructions above and have read the
            information sheets. I am ready to proceed to the next step.
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

export default TargetVisInfo;
