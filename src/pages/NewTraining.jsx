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
    setTimeout(() => {
      window.scrollTo(0, 0); // Scroll to top of the page again after a short delay
    }, 100);
    if (step >= 9 || (step === 8 && condition === "control")) {
      setTrainingChartSeen(true);
      return;
    }
    setStep(step + 1);
  };

  return (
    <div className="paddingBody nobg">
      <h1>
        Training ({step}/{condition === "control" ? 8 : 9})
      </h1>
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
      <p className="trainingText">
        Look at the line chart below. The x-axis is the year. It is mainly
        divided into 2 sections by the "current year" vertical line in the
        middle.
      </p>
      <p className="trainingText">
        On the left, you see one line that represents historically observed
        data.
      </p>
      <p className="trainingText">
        On the right side you see 5 curved lines which represent projected data
        of which colors correspond to each greenhouse gas emissions scenarios
        marked in the legend.
      </p>
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
  const stepHandleNext = () => {
    const s1 =
      ref1.current.value === "" ? null : parseFloat(ref1.current.value);
    const s2 =
      ref2.current.value === "" ? null : parseFloat(ref2.current.value);
    if (s1 === null || s2 === null) {
      alert("Please fill in all fields.");
      return;
    }
    if (s1 != 0.508 || s2 != 0.718) {
      alert("Incorrect values. Please try again.");
      return;
    }
    onNext();
  };

  return (
    <div>
      <p className="trainingText">
        The Y axis is global sea level changes relative to 1900. As an example,
        let's read the data at 1982. By reading like the green arrow, we can
        know that in 1982, the global mean sea level was 0.115m higher compared
        to 1900.
      </p>
      <Chart2
        showArrows={false}
        showAreas={false}
        showThresholds={false}
        showMarkers={false}
        showText={false}
        showWarning={false}
        showReadingGuide={true}
      />
      <p className="trainingText">
        You can also get the detailed data for each year by hovering the mouse.
      </p>
      <div>
        <p style={{ textAlign: "left" }} className="trainingText">
          Please input the projected sea level rise in meters for the year{" "}
          <strong>2090 </strong>
          for each of the following scenarios:
        </p>
        <table
          className="survey-table"
          style={{ maxWidth: 400, margin: "0 0" }}
        >
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Projected Sea Level Rise (m)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p className="veryLowColor" style={{ margin: "0 0" }}>
                  SSP1-1.9 (Very low emissions)
                </p>
              </td>
              <td>
                <input type="number" id="s1" ref={ref1} />
              </td>
            </tr>
            <tr>
              <td>
                <p className="highColor" style={{ margin: "0 0" }}>
                  SSP3-7.0 (High emissions)
                </p>
              </td>
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
      <p className="trainingText">
        Now, how could we make it easier to notice if the scenario lines
        surpassed certain relative sea levels? Let's call Them "thresholds",
        beyond which irreversible, drastic change is expected. In this training,
        we assume that they are 0.4m, 0.6m, 0.8m relative sea levels.
      </p>
      <Chart2
        showArrows={false}
        showAreas={false}
        showMarkers={false}
        showText={false}
        showWarning={false}
        showReadingGuide2={true}
      />
      <p className="trainingText">
        On the graph above, we put horizontal dashed lines to highlight these
        thresholds. By reading as shown by the green line, you can know that
        scenario{" "}
        <span className="veryHighColor">SSP5-8.5 (very high emissions)</span>{" "}
        reaches the <strong>0.4m</strong> threshold in
        <strong> 2051</strong>.
      </p>
      <div>
        <p style={{ textAlign: "left" }} className="trainingText">
          Please input the year when{" "}
          <span className="highColor">scenario SSP3-7.0 (high emissions)</span>{" "}
          reaches the <strong>0.6m</strong> threshold:
        </p>
        <table
          className="survey-table"
          style={{ maxWidth: 400, margin: "0 0" }}
        >
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Year reaching the 0.6m threshold</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p className="highColor" style={{ margin: "0 0" }}>
                  SSP3-7.0 (High emissions)
                </p>
              </td>
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
      <p className="trainingText">
        As shown below, we added circles at the intersections between each
        scenario's curve and the horizontal threshold lines. They pinpoint when
        each emissions pathway crosses a specific sea level threshold.
      </p>
      <p className="trainingText">
        Each circle's color corresponds to its respective emissions scenario.
      </p>
      <Chart2
        showArrows={false}
        showAreas={false}
        showXMarkers={false}
        showText={false}
        showWarning={false}
      />
      <p className="trainingText">
        On the 0.4m threshold line, we see five colored circles — one for each
        scenario — indicating that all five are projected to reach the relative
        0.4m sea level.
      </p>
      <div>
        <p style={{ textAlign: "left" }} className="trainingText">
          Please enter the number of scenarios that reach the 0.6m and the 0.8m
          thresholds until 2100:
        </p>
        <table
          className="survey-table"
          style={{ maxWidth: 400, margin: "0 0" }}
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
      <p className="trainingText">
        Aligned with the circles above, we added droplet-shaped icons along the
        x-axis to pinpoint when each emissions scenario reaches each threshold.
      </p>
      <p className="trainingText">
        Each droplet's color corresponds to the scenario colors.
      </p>
      <p className="trainingText">
        Each droplet's shape indicates a specific sea level threshold crossed:
      </p>
      <ul>
        <li>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              position: "relative",
              top: "6px",
              marginTop: -6,
            }}
          >
            <FirstSeaIcon fill="#7F8CAA" /> = 0.4m
          </span>
        </li>
        <li>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              position: "relative",
              top: "6px",
            }}
          >
            <SecondSeaIcon fill="#7F8CAA" /> = 0.6m
          </span>
        </li>
        <li>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              position: "relative",
              top: "6px",
            }}
          >
            <ThirdSeaIcon fill="#7F8CAA" /> = 0.8m
          </span>
        </li>
      </ul>
      <Chart2
        showArrows={false}
        showAreas={false}
        showText={false}
        showWarning={false}
      />
      <p className="trainingText">
        The placement of{" "}
        <span style={{ position: "relative", top: "6px" }}>
          <ThirdSeaIcon fill="#B12C00" />
        </span>{" "}
        on the X-axis show that scenario{" "}
        <span className="veryHighColor">SSP5-8.5 (Very high emissions)</span>{" "}
        reaches the 0.8m threshold in 2090.
      </p>
      <div>
        <p
          style={{ textAlign: "left", fontWeight: "bold" }}
          className="trainingText"
        >
          Please fill in the blanks correctly:
        </p>
        <p style={{ textAlign: "left" }} className="trainingText">
          The placement of{" "}
          <span style={{ position: "relative", top: "6px", marginTop: -10 }}>
            <SecondSeaIcon fill="#9E6F21" />
          </span>{" "}
          on the X-axis shows that scenario
          <span className="intermediateColor">
            {" "}
            SSP2-4.5 (Intermediate emissions){" "}
          </span>
          reaches the <input type="number" id="s1" ref={ref1} />m threshold in
          the year <input type="number" id="s2" ref={ref2} />.
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
  const stepHandleNext = () => {
    onNext();
  };

  return (
    <div>
      <p className="trainingText">
        <strong>How to read the shaded bands</strong>
      </p>

      <ul>
        <li className="trainingText">
          Each band captures the range of crossing years across all emission
          scenarios for its respective threshold—0.4 m, 0.6 m, or 0.8 m.
        </li>
        <li className="trainingText">
          <strong>Horizontal span:</strong> The band begins at the earliest year
          any emissions scenario crosses that threshold and ends at the latest.
        </li>
        <li className="trainingText">
          <strong>Vertical span:</strong> A band fills the space between the
          x-axis and its corresponding threshold line.
        </li>
        <li className="trainingText">
          If at least one scenario is expected to cross the threshold after
          2100—beyond the limits of the chart—the band extends to the right‐hand
          edge of the graph.
        </li>
      </ul>
      <Chart2 showArrows={false} showText={false} showWarning={false} />
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
      <p className="trainingText">
        <strong>How to read duration indicators</strong>
      </p>
      <ul>
        <li className="trainingText">
          Each shaded band has a corresponding duration bar divided into two
          colour segments:
          <ol>
            <li className="trainingText">
              <strong>2025 → earliest crossing year</strong> – tinted with the
              colour of the scenario that is projected to cross first; the label
              above shows this range.
            </li>
            <li className="trainingText">
              <strong>Earliest → latest crossing year</strong> – tinted with the
              colour of the scenario that is projected to cross last; the label
              above shows that range.
            </li>
          </ol>
        </li>
        <li className="trainingText">
          <p className="trainingText">
            The <b>end of the second part</b> is:
          </p>
          <ul>
            <li className="trainingText">
              <b>Closed</b> if all scenarios cross the threshold{" "}
              <b>before 2100</b>.
            </li>
            <li className="trainingText">
              <b>Pointy</b> if any scenario is expected to cross it{" "}
              <b>after 2100</b>, indicating continuation{" "}
              <b>beyond the graph's time span</b>. We also added "
              <img
                src="./images/animated-dots.webp"
                alt="animated dots"
                style={{
                  height: "1.5rem",
                  position: "relative",
                  top: "0.5rem",
                  marginTop: "-1rem",
                }}
              />
              " on the right of the pointy end.
            </li>
          </ul>
        </li>
      </ul>

      <Chart2 showText={false} showWarning={false} />
      <div>
        <p
          style={{ textAlign: "left", fontWeight: "bold" }}
          className="trainingText"
        >
          Please fill in the blanks correctly:
        </p>
        <ul>
          <li className="trainingText">
            Scenario{" "}
            <span className="veryHighColor">
              SSP5-8.5 (very high emissions)
            </span>{" "}
            is projected to reach the <strong>0.6m</strong> threshold{" "}
            <input type="number" id="s1" ref={ref1} /> years from now.
          </li>
          <li className="trainingText">
            The second part of the horizontal indicator that belongs to the{" "}
            <strong>0.8m </strong>
            threshold area has the color{" "}
            <select id="s2" ref={ref2} style={{ height: "23px" }}>
              <option value="" style={{ fontSize: "20px" }}>
                Select color
              </option>
              <option value="blue" style={{ fontSize: "20px" }}>
                blue
              </option>
              <option value="green" style={{ fontSize: "20px" }}>
                green
              </option>
              <option value="brown" style={{ fontSize: "20px" }}>
                brown
              </option>
              <option value="purple" style={{ fontSize: "20px" }}>
                purple
              </option>
              <option value="red" style={{ fontSize: "20px" }}>
                red
              </option>
            </select>{" "}
            and has a{" "}
            <select id="s3" ref={ref3} style={{ height: "23px" }}>
              <option value="" style={{ fontSize: "20px" }}>
                Select shape
              </option>
              <option value="closed" style={{ fontSize: "20px" }}>
                closed
              </option>
              <option value="pointy" style={{ fontSize: "20px" }}>
                pointy
              </option>
            </select>{" "}
            end.
            <br />
            Therefore, the last scenario to reach the <strong>0.8m</strong>{" "}
            threshold—beyond the chart’s 2100 limit—is{" "}
            <select id="s4" ref={ref4} style={{ height: "23px" }}>
              <option value="" style={{ fontSize: "20px" }}>
                Select scenario
              </option>
              <option value="SSP1-1.9" style={{ fontSize: "20px" }}>
                SSP1-1.9 (Very low emissions)
              </option>
              <option value="SSP1-2.6" style={{ fontSize: "20px" }}>
                SSP1-2.6 (Low emissions)
              </option>
              <option value="SSP2-4.5" style={{ fontSize: "20px" }}>
                SSP2-4.5 (Intermediate emissions)
              </option>
              <option value="SSP3-7.0" style={{ fontSize: "20px" }}>
                SSP3-7.0 (High emissions)
              </option>
              <option value="SSP5-8.5" style={{ fontSize: "20px" }}>
                SSP5-8.5 (Very high emissions)
              </option>
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
      <p className="trainingText">Please, be careful about the following:</p>
      <ul>
        <li className="trainingText">
          <b>Higher greenhouse gas emissions</b> leads to{" "}
          <b>faster sea level rise</b>, which poses <b>greater risks</b>.
        </li>
        <li className="trainingText">
          Therefore, <b>crossing a threshold earlier</b> is <b>worse</b> than
          crossing it later, as it reflects more severe and rapid climate
          impact.
        </li>
      </ul>
      <Chart2 showText={false} />
      <p className="trainingText">
        As you see above, we added the warning message{" "}
        <span className="warningText">
          "Reaching the threshold early is worse"
        </span>{" "}
        to make it clearer to you.
      </p>
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
      <p className="trainingText">
        Now, the elements that were at the right part of "current year" vertical
        line is gone. This is to reveal them little by little with the
        animation. The calendar shows the year the animation is in. You can
        click the purple button to start, continue, or reset animation. Try it!
      </p>
      <AnimatedChart2 showText={false} />
      <p className="trainingText">
        You will notice that the animation stops playing at certain timings. The
        animation stops at the beginning and the end of each shaded area.
      </p>
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
