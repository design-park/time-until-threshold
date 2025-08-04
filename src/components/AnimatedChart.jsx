import React, { useMemo, useState } from "react";
import Chart from "./Chart";
import { useSimpleAnimatedValue } from "../simpleAnimatedValue";

const OPTIONS = {
  1: {
    title: "Stop at first and last crossing of every temperature limit",
    animationBounds: [
      [2025, 2027.8],
      [2027.8, 2034.1],
      [2034.1, 2041.8],
      [2041.8, 2052.3],
      [2052.3, 2084.2],
      [2084.2, 2099],
    ],
    maxTemperatures: [5, 5, 5, 5],
  },
  2: {
    title: "Stop at every crossing, no going back",
    animationBounds: [
      [2024, 2027.8],
      [2027.8, 2030.5],
      [2030.5, 2030.8],
      [2030.8, 2032.1],
      [2032.1, 2034.1],
      [2034.1, 2041.8],
      [2041.8, 2046.9],
      [2046.9, 2052.3],
      [2052.3, 2084.2],
      [2084.2, 2099],
    ],
    maxTemperatures: [5, 5, 5, 5],
  },
};

function AnimatedChart({ option = 1 }) {
  const [index, setIndex] = useState(0);
  const bounds = useMemo(() => {
    const newBounds = OPTIONS[option].animationBounds[index];
    console.log(`Bounds for option ${option} at index ${index}:`, newBounds);
    return newBounds;
  }, [index, option]);

  const maxTemperature = useMemo(
    () => OPTIONS[option].maxTemperatures[index],
    [index, option]
  );
  // Animate maxTemperature between 0.5 and 5
  const { value, play, isPlaying, reset } = useSimpleAnimatedValue(
    bounds[0],
    bounds[1],
    (bounds[1] - bounds[0]) * 200,
    20
  );

  const changeBounds = () => {
    const newIndex = (index + 1) % OPTIONS[option].animationBounds.length;
    console.log(newIndex);
    setIndex(newIndex);
    reset();
  };

  const changeBoundsAndPlay = () => {
    changeBounds();
    if (index + 1 < OPTIONS[option].animationBounds.length) {
      setTimeout(() => {
        play();
      }, 0);
    }
  };

  return (
    <div>
      <Chart
        maxTemperature={maxTemperature}
        maxYear={value}
        blinkingScenarioForMaxTemp={isPlaying ? undefined : "SSP5-8.5"}
        aboveChart={
          <div className="aboveChart">
            <p className="invisible"> ⬅ Click to interact with the visualization</p>
            <div className="calenderContainer">
              <img
                src="./images/calendar.png"
                alt="Calender Icon"
                style={{ width: "80px" }}
              />
              <p className="yearLabel">Year</p>
              <p className="yearValueLabel">{Math.round(value)}</p>
            </div>
            <div className="animationButtonContainer">
              {!isPlaying && value === bounds[0] && (
                <button
                  className="userAnimationButton"
                  onClick={() => {
                    play();
                  }}
                >
                  Play animation
                </button>
              )}
              {!isPlaying && value === bounds[1] && (
                <button
                  className="userAnimationButton"
                  onClick={() => {
                    changeBoundsAndPlay();
                  }}
                >
                  {index + 1 === OPTIONS[option].animationBounds.length
                    ? "Reset"
                    : `Continue animation`}
                </button>
              )}
              {isPlaying && (
                <button className="userAnimationButton" disabled>
                  Playing...
                </button>
              )}
              <p className="buttonInstructionText"> ⬅ Click to interact with the visualization</p>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default AnimatedChart;
