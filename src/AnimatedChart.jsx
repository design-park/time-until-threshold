import React, { useMemo, useState } from "react";
import Chart from "./Chart";
import { useAnimatedValue } from "./animatedValue";
import { useSimpleAnimatedValue } from "./simpleAnimatedValue";

const ANIMATION_BOUNDS = [
  [2014, 2035],
  [2028, 2100],
  [2042, 2100],
  [2085, 2100],
];

const MAX_TEMPERATURES = [1.5, 2, 4, 5];

function AnimatedChart() {
  const [index, setIndex] = useState(0);
  const bounds = useMemo(() => ANIMATION_BOUNDS[index], [index]);
  const maxTemperature = useMemo(() => MAX_TEMPERATURES[index], [index]);

  const changeBounds = () => {
    setIndex((index + 1) % ANIMATION_BOUNDS.length);
  };
  // Animate maxTemperature between 0.5 and 5
  const { value, play, isPlaying } = useSimpleAnimatedValue(
    bounds[0],
    bounds[1],
    (bounds[1] - bounds[0]) * 300,
    20
  );

  return (
    <div>
      <Chart
        maxTemperature={maxTemperature}
        maxYear={value}
        blinkingScenarioForMaxTemp={isPlaying ? undefined : "SSP5-8.5"}
      />
      <div className="actionButtonContainer">
        {!isPlaying && value === bounds[0] && (
          <button
            className="userActionButton"
            onClick={() => {
              play();
            }}
          >
            Play until +{maxTemperature}°C
          </button>
        )}
        {!isPlaying && value === bounds[1] && (
          <button
            className="userActionButton"
            onClick={() => {
              changeBounds();
            }}
          >
            {maxTemperature === MAX_TEMPERATURES[MAX_TEMPERATURES.length - 1]
              ? "Reset"
              : `Return to blinking year`}
          </button>
        )}
        {isPlaying && (
          <button className="userActionButton" disabled>
            Playing...
          </button>
        )}
      </div>
    </div>
  );
}

export default AnimatedChart;
