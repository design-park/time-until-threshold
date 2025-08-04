import { useRef, useState } from "react";
import Chart2 from "../components/Chart2";
import AnimatedChart2 from "../components/AnimatedChart2";
import { useStore } from "../store";

function NewTraining() {
  const step = useStore((state) => state.trainingStep);
  const setStep = useStore((state) => state.setTrainingStep);
  const condition = useStore((state) => state.condition);
  const setTrainingChartSeen = useStore((state) => state.setTrainingChartSeen);

  const handleNext = () => {
    window.scrollTo(0, 0); // Scroll to top of the page
    if (step >= 9 || (step === 8 && condition === "control")) {
      setTrainingChartSeen(true);
      return;
    }
    setStep(step + 1);
  };

  return (
    <div className="paddingBody nobg">
      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 onNext={handleNext} />}
      {step === 3 && <Step3 onNext={handleNext} />}
      {step === 4 && <Step4 onNext={handleNext} />}
      {step === 5 && <Step5 onNext={handleNext} />}
      {step === 6 && <Step6 onNext={handleNext} />}
      {step === 7 && <Step7 onNext={handleNext} />}
      {step === 8 && <Step8 onNext={handleNext} />}
      {step === 9 && <Step9 onNext={handleNext} />}
    </div>
  );
}

function Step1({ onNext }) {
  const stepHandleNext = () => {
    onNext();
  };
  return (
    <div>
      <h1>Training</h1>
      <p>Step 1.</p>
      <Chart2
        showArrows={false}
        showAreas={false}
        showThresholds={false}
        showMarkers={false}
        showText={false}
        showWarning={false}
      />
      <div className="actionButtonContainer">
        <button className="userActionButton" onClick={stepHandleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

function Step2({ onNext }) {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const stepHandleNext = () => {
    const s1 =
      ref1.current.value === "" ? null : parseFloat(ref1.current.value);
    const s2 =
      ref2.current.value === "" ? null : parseFloat(ref2.current.value);
    const s3 =
      ref3.current.value === "" ? null : parseFloat(ref3.current.value);
    const s4 =
      ref4.current.value === "" ? null : parseFloat(ref4.current.value);
    const s5 =
      ref5.current.value === "" ? null : parseFloat(ref5.current.value);
    if (
      s1 === null ||
      s2 === null ||
      s3 === null ||
      s4 === null ||
      s5 === null
    ) {
      alert("Please fill in all fields.");
      return;
    }
    if (
      s1 != 0.508 ||
      s2 != 0.548 ||
      s3 != 0.638 ||
      s4 != 0.718 ||
      s5 != 0.788
    ) {
      alert("Incorrect values. Please try again.");
      return;
    }
    onNext();
  };

  return (
    <div>
      <h1>Training</h1>
      <p>Step 2.</p>
      <Chart2
        showArrows={false}
        showAreas={false}
        showThresholds={false}
        showMarkers={false}
        showText={false}
        showWarning={false}
        showReadingGuide={true}
      />
      <div>
        <p style={{ textAlign: "center" }}>
          Please input the projected sea level rise in meters for the year 2090
          for each scenario:
        </p>
        <table
          className="survey-table"
          style={{ maxWidth: 400, margin: "0 auto" }}
        >
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Projected Sea Level Rise (m)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SSP1-1.9 (Very low emissions)</td>
              <td>
                <input type="number" id="s1" ref={ref1} />
              </td>
            </tr>
            <tr>
              <td>SSP1-2.6 (Low emissions)</td>
              <td>
                <input type="number" id="s2" ref={ref2} />
              </td>
            </tr>
            <tr>
              <td>SSP2-4.5 (Intermediate emissions)</td>
              <td>
                <input type="number" id="s3" ref={ref3} />
              </td>
            </tr>
            <tr>
              <td>SSP3-7.0 (High emissions)</td>
              <td>
                <input type="number" id="s4" ref={ref4} />
              </td>
            </tr>
            <tr>
              <td>SSP5-8.5 (Very high emissions)</td>
              <td>
                <input type="number" id="s5" ref={ref5} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="actionButtonContainer">
        <button className="userActionButton" onClick={stepHandleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

function Step3({ onNext }) {
  const ref1 = useRef();
  const stepHandleNext = () => {
    const s1 =
      ref1.current.value === "" ? null : parseFloat(ref1.current.value);
    if (s1 === null) {
      alert("Please fill in all fields.");
      return;
    }
    if (s1 != 2078) {
      alert("Incorrect values. Please try again.");
      return;
    }
    onNext();
  };

  return (
    <div>
      <h1>Training</h1>
      <p>Step 3.</p>
      <Chart2
        showArrows={false}
        showAreas={false}
        showMarkers={false}
        showText={false}
        showWarning={false}
        showReadingGuide2={true}
      />
      <div>
        <p style={{ textAlign: "center" }}>
          Please input the year when SSP3-7.0 (high emissions scenario) reaches
          the 0.6m threshold:
        </p>
        <table
          className="survey-table"
          style={{ maxWidth: 400, margin: "0 auto" }}
        >
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Year reaching the 0.6m threshold</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SSP3-7.0 (High emissions)</td>
              <td>
                <input type="number" id="s1" ref={ref1} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="actionButtonContainer">
        <button className="userActionButton" onClick={stepHandleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

function Step4({ onNext }) {
  const ref1 = useRef();
  const ref2 = useRef();
  const stepHandleNext = () => {
    const s1 =
      ref1.current.value === "" ? null : parseFloat(ref1.current.value);
    const s2 =
      ref2.current.value === "" ? null : parseFloat(ref2.current.value);
    if (s1 === null || s2 === null) {
      alert("Please fill in all fields.");
      return;
    }
    if (s1 != 3 || s2 != 2) {
      alert("Incorrect values. Please try again.");
      return;
    }
    onNext();
  };

  return (
    <div>
      <h1>Training</h1>
      <p>Step 4.</p>
      <Chart2
        showArrows={false}
        showAreas={false}
        showXMarkers={false}
        showText={false}
        showWarning={false}
      />
      <div>
        <p style={{ textAlign: "center" }}>
          Please enter the number of scenarios that reach the 0.6m and the 0.8m
          thresholds between 2025 and 2100:
        </p>
        <table
          className="survey-table"
          style={{ maxWidth: 400, margin: "0 auto" }}
        >
          <thead>
            <tr>
              <th>Threshold</th>
              <th>Number of scenarios reaching it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0.6m</td>
              <td>
                <input type="number" id="s1" ref={ref1} />
              </td>
            </tr>
            <tr>
              <td>0.8m</td>
              <td>
                <input type="number" id="s2" ref={ref2} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="actionButtonContainer">
        <button className="userActionButton" onClick={stepHandleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

function Step5({ onNext }) {
  const ref1 = useRef();
  const ref2 = useRef();
  const stepHandleNext = () => {
    const s1 =
      ref1.current.value === "" ? null : parseFloat(ref1.current.value);
    const s2 =
      ref2.current.value === "" ? null : parseFloat(ref2.current.value);
    if (s1 === null || s2 === null) {
      alert("Please fill in all fields.");
      return;
    }
    if (s1 != 0.6 || s2 != 2085) {
      alert("Incorrect values. Please try again.");
      return;
    }
    onNext();
  };

  return (
    <div>
      <h1>Training</h1>
      <p>Step 5.</p>
      <Chart2
        showArrows={false}
        showAreas={false}
        showText={false}
        showWarning={false}
      />
      <div>
        <p style={{ textAlign: "center" }}>
          Please fill in the blanks correctly:
        </p>
        <p style={{ textAlign: "center" }}>
          The placement of <SecondSeaIcon fill="#9E6F21" /> on the X-axis shows
          that SSP2-4.5 reaches the <input type="number" id="s1" ref={ref1} />m
          threshold in the year <input type="number" id="s2" ref={ref2} />.
        </p>
      </div>
      <div className="actionButtonContainer">
        <button className="userActionButton" onClick={stepHandleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

function Step6({ onNext }) {
  const ref1 = useRef();
  const stepHandleNext = () => {
    const s1 =
      ref1.current.value === "" ? null : parseFloat(ref1.current.value);
    if (s1 === null) {
      alert("Please fill in all fields.");
      return;
    }
    if (s1 != 2) {
      alert("Incorrect values. Please try again.");
      return;
    }
    onNext();
  };

  return (
    <div>
      <h1>Training</h1>
      <p>Step 6.</p>
      <Chart2 showArrows={false} showText={false} showWarning={false} />
      <div>
        <p style={{ textAlign: "center" }}>
          Please fill in the blanks correctly:
        </p>
        <p style={{ textAlign: "center" }}>
          At least <input type="number" id="s1" ref={ref1} /> scenarios are
          projected to reach the 0.8m threshold after 2025 (including after
          2100).
        </p>
      </div>
      <div className="actionButtonContainer">
        <button className="userActionButton" onClick={stepHandleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

function Step7({ onNext }) {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const stepHandleNext = () => {
    const s1 =
      ref1.current.value === "" ? null : parseFloat(ref1.current.value);
    const s2 = ref2.current.value === "" ? null : ref2.current.value;
    const s3 = ref3.current.value === "" ? null : ref3.current.value;
    const s4 = ref4.current.value === "" ? null : ref4.current.value;
    if (s1 === null || s2 === null || s3 === null || s4 === null) {
      alert("Please fill in all fields.");
      return;
    }
    if (s1 != 49 || s2 != "blue" || s3 != "pointy" || s4 != "SSP1-1.9") {
      alert("Incorrect values. Please try again.");
      return;
    }
    onNext();
  };

  return (
    <div>
      <h1>Training</h1>
      <p>Step 7.</p>
      <Chart2 showText={false} showWarning={false} />
      <div>
        <p style={{ textAlign: "center" }}>
          Please fill in the blanks correctly:
        </p>
        <ul>
          <li>
            The SSP5-8.5 (very high emissions) scenario is projected to reach
            the 0.6m threshold <input type="number" id="s1" ref={ref1} /> years
            from now.
          </li>
          <li>
            The second part of the horizontal indicator that belongs to the 0.8m
            threshold area has the color{" "}
            <select id="s2" ref={ref2}>
              <option value="">Select color</option>
              <option value="blue">blue</option>
              <option value="green">green</option>
              <option value="brown">brown</option>
              <option value="purple">purple</option>
              <option value="red">red</option>
            </select>{" "}
            and has a{" "}
            <select id="s3" ref={ref3}>
              <option value="">Select shape</option>
              <option value="closed">closed</option>
              <option value="pointy">pointy</option>
            </select>{" "}
            end.
            <br />
            Therefore, the last scenario to reach the 0.8m threshold is{" "}
            <select id="s4" ref={ref4}>
              <option value="">Select scenario</option>
              <option value="SSP1-1.9">SSP1-1.9 (Very low emissions)</option>
              <option value="SSP1-2.6">SSP1-2.6 (Low emissions)</option>
              <option value="SSP2-4.5">
                SSP2-4.5 (Intermediate emissions)
              </option>
              <option value="SSP3-7.0">SSP3-7.0 (High emissions)</option>
              <option value="SSP5-8.5">SSP5-8.5 (Very high emissions)</option>
            </select>
            .
          </li>
        </ul>
      </div>
      <div className="actionButtonContainer">
        <button className="userActionButton" onClick={stepHandleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

function Step8({ onNext }) {
  const condition = useStore((state) => state.condition);

  const stepHandleNext = () => {
    onNext();
  };
  return (
    <div>
      <h1>Training</h1>
      <p>Step 8.</p>
      <Chart2 showText={false} />
      <div className="actionButtonContainer">
        <button className="userActionButton" onClick={stepHandleNext}>
          {condition === "control" ? "Finish Training" : "Next"}
        </button>
      </div>
    </div>
  );
}

function Step9({ onNext }) {
  const stepHandleNext = () => {
    onNext();
  };
  return (
    <div>
      <h1>Training</h1>
      <p>Step 9.</p>
      <AnimatedChart2 showText={false} />
      <div className="actionButtonContainer">
        <button className="userActionButton" onClick={stepHandleNext}>
          Finish Training
        </button>
      </div>
    </div>
  );
}

const FirstSeaIcon = (props) => {
  const { cx, cy, fill } = props;
  const SCALE = 0.035;
  const width = 800 * SCALE;
  const height = 800 * SCALE;

  return (
    <svg
      x={cx - width / 2} // Adjust x position to center the shape
      y={cy - height} // Adjust y position to center the shape
      width={width} // Width of the original shape
      height={height} // Height of the original shape
      viewBox="0 0 800 800" // Original viewBox dimensions
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <g clipPath="url(#clip0_53_6)">
        <path d="M800 0H0V800H800V0Z" fill="white" fillOpacity="0.01" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M400 733.333C538.072 733.333 650 621.405 650 483.333C650 250 400 66.6665 400 66.6665C400 66.6665 150 250 150 483.333C150 621.405 261.928 733.333 400 733.333Z"
          stroke="#333"
          strokeWidth="66.6667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M164.5 569.065C227.5 702.5 321 733.5 415.5 733.5C523 733.5 616.5 653 649 522.5C649 522.5 533.5 587.854 415.5 553.456C275 512.5 164.5 569.065 164.5 569.065Z"
          fill={fill}
          stroke="#333"
          strokeWidth="66.6667"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_53_6">
          <rect width="800" height="800" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const SecondSeaIcon = (props) => {
  const { cx, cy, fill } = props;
  const SCALE = 0.035;
  const width = 800 * SCALE;
  const height = 800 * SCALE;

  return (
    <svg
      x={cx - width / 2} // Adjust x position to center the shape
      y={cy - height} // Adjust y position to center the shape
      width={width} // Width of the original shape
      height={height} // Height of the original shape
      viewBox="0 0 800 800" // Original viewBox dimensions
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <g clipPath="url(#clip0_53_10)">
        <path d="M800 0H0V800H800V0Z" fill="white" fillOpacity="0.01" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M400 733.333C538.072 733.333 650 621.405 650 483.333C650 250 400 66.6665 400 66.6665C400 66.6665 150 250 150 483.333C150 621.405 261.928 733.333 400 733.333Z"
          stroke="#333"
          strokeWidth="66.6667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M156.5 426.5C139.896 497.946 159.69 584.397 208 643.5C255.707 701.866 331.398 733.333 400 733.333C469.935 733.333 545.085 699.534 593 641.5C639.682 584.959 660.272 505.211 643 426.5C643 426.5 500 495.5 400 445.5C300 395.5 156.5 426.5 156.5 426.5Z"
          fill={fill}
          stroke="#333"
          strokeWidth="66.6667"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_53_10">
          <rect width="800" height="800" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const ThirdSeaIcon = (props) => {
  const { cx, cy, fill } = props;
  const SCALE = 0.035;
  const width = 800 * SCALE;
  const height = 800 * SCALE;

  return (
    <svg
      x={cx - width / 2} // Adjust x position to center the shape
      y={cy - height} // Adjust y position to center the shape
      width={width} // Width of the original shape
      height={height} // Height of the original shape
      viewBox="0 0 800 800" // Original viewBox dimensions
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <g clipPath="url(#clip0_53_15)">
        <path d="M800 0H0V800H800V0Z" fill="white" fillOpacity="0.01" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M400 733.333C538.072 733.333 650 621.405 650 483.333C650 250 400 66.6665 400 66.6665C400 66.6665 150 250 150 483.333C150 621.405 261.928 733.333 400 733.333Z"
          stroke="#333"
          strokeWidth="66.6667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M175.5 350.5C154 398.5 145 460.5 154 515C165.559 585 202.401 644.076 250 684.5C294.164 722.006 366.708 732.5 412 732.5C476.701 732.5 552 691 608 617.5C638.095 578 650 521 650 468C650 415 629.5 360.5 614.5 328C614.5 328 500 368 400 318C300 268 175.5 350.5 175.5 350.5Z"
          fill={fill}
          stroke="#333"
          strokeWidth="66.6667"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_53_15">
          <rect width="800" height="800" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default NewTraining;
