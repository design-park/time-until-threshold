import React, { useMemo, useState } from "react";
import Chart from "./Chart";
import { useSimpleAnimatedValue } from "../simpleAnimatedValue";

const OPTIONS = {
  1: {
    title: "Temperature limits go back to first crossing",
    animationBounds: [
      [2014, 2035],
      [2028, 2100],
      [2042, 2100],
      [2085, 2100],
    ],
    maxTemperatures: [1.5, 2, 4, 5],
  },
  2: {
    title: "No temperature limits go back to first crossing",
    animationBounds: [
      [2014, 2035],
      [2028, 2100],
      [2042, 2100],
      [2085, 2100],
    ],
    maxTemperatures: [5, 5, 5, 5],
  },
  3: {
    title: "Temperature limits go back to start",
    animationBounds: [
      [2014, 2035],
      [2014, 2100],
      [2014, 2100],
      [2014, 2100],
    ],
    maxTemperatures: [1.5, 2, 4, 5],
  },
  4: {
    title: "No temperature limits go back to start",
    animationBounds: [
      [2014, 2035],
      [2014, 2100],
      [2014, 2100],
      [2014, 2100],
    ],
    maxTemperatures: [5, 5, 5, 5],
  },
  5: {
    title: "Stop at every crossing, no going back",
    animationBounds: [
      [2014, 2028],
      [2028, 2030.5],
      [2030.5, 2030.9],
      [2030.9, 2032.3],
      [2032.3, 2034.3],
      [2034.3, 2042],
      [2042, 2047],
      [2047, 2052.5],
      [2052.5, 2084.5],
      [2084.5, 2100],
    ],
    maxTemperatures: [5, 5, 5, 5],
  },
  6: {
    title: "Stop at first crossing of every temperature limit",
    animationBounds: [
      [2014, 2028],
      [2028, 2042],
      [2042, 2084.5],
      [2084.5, 2100],
    ],
    maxTemperatures: [5, 5, 5, 5],
  },
  7: {
    title: "Stop at first and last crossing of every temperature limit",
    animationBounds: [
      [2024, 2028],
      [2028, 2034.3],
      [2034.3, 2042],
      [2042, 2052.5],
      [2052.5, 2084.5],
      [2084.5, 2100],
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

  return (
    <div>
      <h2 className="chartTitle">{OPTIONS[option].title}</h2>
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
            {maxTemperature ===
            OPTIONS[option].maxTemperatures[
              OPTIONS[option].maxTemperatures.length - 1
            ]
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
