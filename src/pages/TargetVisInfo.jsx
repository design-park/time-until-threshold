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
          <h4 className="instruction-text">
            Main Task: Interacting with the Target Visualization
          </h4>
          <p className="subText">
            You are now entering the <strong>main part</strong> of the
            experiment.
          </p>
          <ul>
            <li>
              You will interact with a <strong>line graph visualization</strong>
              .
            </li>
            <li>
              You will complete a <strong>quiz sheet</strong> based on the
              visualization.
            </li>
            <li>
              A <strong>timer</strong> will run to ensure you spend a minimum
              amount of time engaging with the visualization.
            </li>
          </ul>

          <p className="subText">
            The visualization format is similar to the training one, but the
            <strong> subject has changed</strong>. Instead of showing
            <em> global mean sea level change</em>, the new graph presents
            <strong> global surface temperature trends</strong>.
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
                projected changes in climate extremes increase in frequency and
                intensity with every additional increment of global warming
              </em>
              .
            </li>
          </ul>

          <p className="subText">
            You are encouraged to{" "}
            <strong>refer to both information sheets</strong> while interacting
            with the visualization and completing the quiz. However, please
            remember that{" "}
            <span class="important">note-taking is not allowed</span>.
          </p>

          <p className="subText">
            As in the training step, the researcher will review your quiz
            responses before allowing you to continue to the final part of the
            experiment.
          </p>

          <label className="checkBox">
            I have well understood the instruction above and read the
            information sheets.
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

export default TargetVisInfo;
