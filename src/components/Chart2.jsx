import React, { useState, useEffect, useMemo, Fragment } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
  Tooltip,
} from "recharts";
import { rawCsvData2 } from "../seaLevelData";
import { useBlinker } from "../blinker";

// Function to parse CSV data from a string
function parseCsvString(csvString) {
  const lines = csvString.trim().split("\n");
  const headers = lines[0].split(",").map((header) => header.trim());
  const data = lines.slice(1).map((line) => {
    const values = line.split(",").map((value) => value.trim());
    const row = {};
    headers.forEach((header, index) => {
      // Map 'SeaLevel' to 'Mean' and 'Scenario' to 'scenario'
      const mappedHeader =
        header === "SeaLevel"
          ? "Mean"
          : header === "Scenario"
          ? "scenario"
          : header;
      // Convert numeric values to numbers, keep others as strings
      row[mappedHeader] = isNaN(Number(values[index]))
        ? values[index]
        : Number(values[index]);
    });
    return row;
  });
  return data;
}

// Custom SVG Shapes for ReferenceDots
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

const CircleIcon = (props) => {
  const { cx, cy, fill } = props;
  return (
    <circle cx={cx} cy={cy} r={4} fill={fill} stroke="#333" strokeWidth={1} />
  );
};

// Main React component for the application
function Chart2({
  maxSeaLevel = 1,
  maxYear = 2100,
  blinkingScenarioForMaxTemp = null,
}) {
  const blinker = useBlinker(500); // Blinker hook to toggle visibility every second
  const [fullChartData, setFullChartData] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Stores first year each scenario crosses a threshold: { 'SSP1-1.9': { '1.5': 2035, '2.0': null, '4.0': null }, ... }
  const [scenarioThresholdCrossings, setScenarioThresholdCrossings] = useState(
    {}
  );

  // Define an array of colors for the lines (re-ordered slightly for better visual distinction)
  const lineColors = [
    "#7F8CAA", // Gray
    "#82ca9d", // Green
    "#8DD8FF", // Blue
    "#f17e5d", // Coral
    "#8884d8", // Purple
    "#f15d7e", // Pink
    "#a4de6c", // Light Green
    "#d0ed57", // Lime Green
    "#88a8c3", // Light Blue-Gray
    "#e3516e", // Dark Pink
  ];

  // Define temperature thresholds and their corresponding icon types
  const thresholds = [
    { value: 0.4, label: "0.4m", iconX: FirstSeaIcon, iconY: CircleIcon },
    { value: 0.6, label: "0.6m", iconX: SecondSeaIcon, iconY: CircleIcon },
    { value: 0.8, label: "0.8m", iconX: ThirdSeaIcon, iconY: CircleIcon },
  ];

  useEffect(() => {
    try {
      const rawData = parseCsvString(rawCsvData2);

      if (rawData.length === 0) {
        setError("No data found or failed to parse CSV.");
        setLoading(false);
        return;
      }

      const uniqueScenarios = [
        ...new Set(rawData.map((d) => d.scenario)),
      ].sort();
      setScenarios(uniqueScenarios);

      const groupedData = rawData.reduce((acc, current) => {
        const year = current.Year;
        const scenario = current.scenario;
        const meanSeaLevel = current.Mean;

        let yearEntry = acc.find((entry) => entry.Year === year);
        if (!yearEntry) {
          yearEntry = { Year: year };
          acc.push(yearEntry);
        }
        yearEntry[scenario] = meanSeaLevel;
        return acc;
      }, []);

      groupedData.sort((a, b) => a.Year - b.Year);
      const pointsToAdd = [];

      // --- Calculate Threshold Crossing Years ---
      const crossings = {};
      for (const scenario of uniqueScenarios) {
        crossings[scenario] = {};
        for (const thresh of thresholds) {
          crossings[scenario][thresh.value] = null; // Initialize to null
        }

        // Track if a threshold has been crossed for the current scenario
        const hasCrossed = {};
        for (const thresh of thresholds) {
          hasCrossed[thresh.value] = false;
        }

        let previousDataPoint = null;
        for (const dataPoint of groupedData) {
          if (dataPoint[scenario] !== undefined) {
            // Ensure data exists for this scenario in this year
            const currentSeaLevel = dataPoint[scenario];
            const currentYear = dataPoint.Year;

            for (const thresh of thresholds) {
              if (
                !hasCrossed[thresh.value] &&
                currentSeaLevel >= thresh.value
              ) {
                // Determine when the threshold is crossed using linear interpolation
                if (previousDataPoint !== null) {
                  // Calculate the crossing year (floating point) using linear interpolation
                  const slope =
                    (currentSeaLevel - previousDataPoint[scenario]) /
                    (currentYear - previousDataPoint.Year);
                  const intercept = currentSeaLevel - slope * currentYear;
                  const crossingYear = (thresh.value - intercept) / slope;
                  crossings[scenario][thresh.value] = crossingYear;
                  // Add a point for each scenario at this crossing year
                  const newPoint = {
                    Year: crossingYear,
                    [scenario]: thresh.value,
                  };
                  for (const otherScenario of uniqueScenarios) {
                    if (otherScenario === scenario) continue; // Skip the current scenario
                    // If the scenario exists in the previous year and the current year
                    if (
                      previousDataPoint &&
                      previousDataPoint[otherScenario] !== undefined &&
                      dataPoint[otherScenario] !== undefined
                    ) {
                      // Calculate value at crossing year using linear interpolation
                      const otherSlope =
                        (dataPoint[otherScenario] -
                          previousDataPoint[otherScenario]) /
                        (currentYear - previousDataPoint.Year);
                      const otherValue =
                        previousDataPoint[otherScenario] +
                        otherSlope * (crossingYear - previousDataPoint.Year);
                      newPoint[otherScenario] = otherValue;
                    }
                  }
                  // Add the new point to the chart data
                  pointsToAdd.push(newPoint);
                } else {
                  // If no previous data, use the current year directly
                  crossings[scenario][thresh.value] = currentYear;
                }
                hasCrossed[thresh.value] = true;
              }
            }
          }
          // Update previous values for next iteration
          previousDataPoint = dataPoint;
        }
      }
      setScenarioThresholdCrossings(crossings);
      // Add all calculated points to the groupedData
      pointsToAdd.forEach((point) => {
        groupedData.push(point);
      });
      groupedData.sort((a, b) => a.Year - b.Year);
      setFullChartData(groupedData);

      setLoading(false);
    } catch (err) {
      setError("Failed to process data: " + err.message);
      setLoading(false);
    }
  }, []); // Empty dependency array means this effect runs once after initial render

  const chartDataFilteredY = useMemo(() => {
    const stoppedScenarios = [];
    const pointsToAdd = [];
    const chartData = fullChartData.map((dataPoint) => ({ ...dataPoint })); // Create a shallow copy of fullChartData
    let previousDataPoint = null;
    for (const dataPoint of chartData) {
      for (const scenario of stoppedScenarios) {
        delete dataPoint[scenario];
      }
      for (const scenario of Object.keys(dataPoint)) {
        if (scenario === "Year") continue; // Skip the Year key
        // If the scenario exceeds the max temperature, remove it
        if (dataPoint[scenario] > maxSeaLevel && previousDataPoint) {
          // Create a new point with the maxSeaLevel value as temperature (year is floating point, linear interpolation)
          const crossingYear =
            previousDataPoint.Year +
            ((maxSeaLevel - previousDataPoint[scenario]) /
              (dataPoint[scenario] - previousDataPoint[scenario])) *
              (dataPoint.Year - previousDataPoint.Year);

          const newPoint = {
            Year: crossingYear,
            [scenario]: maxSeaLevel,
          };

          for (const otherScenario of Object.keys(previousDataPoint)) {
            if (otherScenario === "Year" || otherScenario === scenario)
              continue; // Skip the Year key and the current scenario
            if (stoppedScenarios.includes(otherScenario)) continue; // Skip stopped scenarios
            // If the scenario exists in the previous year and the current year
            if (
              previousDataPoint[otherScenario] !== undefined &&
              dataPoint[otherScenario] !== undefined
            ) {
              // Calculate value at crossing year using linear interpolation
              const otherSlope =
                (dataPoint[otherScenario] - previousDataPoint[otherScenario]) /
                (dataPoint.Year - previousDataPoint.Year);
              const otherValue =
                previousDataPoint[otherScenario] +
                otherSlope * (crossingYear - previousDataPoint.Year);
              newPoint[otherScenario] = otherValue;
            }
          }
          // Add the new point to the chart data
          pointsToAdd.push(newPoint);
          delete dataPoint[scenario];
          stoppedScenarios.push(scenario);
        }
      }
      previousDataPoint = dataPoint;
    }
    // Add all calculated points to the chart data
    pointsToAdd.forEach((point) => {
      chartData.push(point);
    });
    chartData.sort((a, b) => a.Year - b.Year);
    return chartData;
  }, [fullChartData, maxSeaLevel]);

  const chartDataFilteredXY = useMemo(() => {
    const finalChartData = chartDataFilteredY.map((dataPoint) => ({
      ...dataPoint,
    })); // Create a shallow copy of fullChartData

    // Add a point using linear interpolation if year is not an integer
    let previousDataPoint = null;
    for (const dataPoint of finalChartData) {
      if (dataPoint.Year > maxYear) {
        if (Math.round(maxYear) !== maxYear) {
          const pointToAdd = {
            Year: maxYear,
          };
          // Interpolate values for all scenarios
          for (const scenario of Object.keys(previousDataPoint)) {
            if (scenario === "Year") continue; // Skip the Year key
            if (!dataPoint[scenario]) continue;
            // If the scenario exists in the previous year and the current year
            // Calculate value at crossing year using linear interpolation
            const slope =
              (dataPoint[scenario] - previousDataPoint[scenario]) /
              (dataPoint.Year - previousDataPoint.Year);
            const interpolatedValue =
              previousDataPoint[scenario] +
              slope * (maxYear - previousDataPoint.Year);
            pointToAdd[scenario] = interpolatedValue;
          }
          finalChartData.push(pointToAdd);
          break; // Stop after adding the point for maxYear
        }
      }
      previousDataPoint = dataPoint;
    }
    // Remove points past the maxYear
    finalChartData.sort((a, b) => a.Year - b.Year);

    const pointsToAdd = [];

    // Add a point for each year using linear interpolation
    previousDataPoint = null;
    for (const dataPoint of finalChartData) {
      if (previousDataPoint && dataPoint.Year <= maxYear) {
        for (
          let year = Math.floor(previousDataPoint.Year + 1);
          year < dataPoint.Year;
          year++
        ) {
          const pointToAdd = { Year: year };
          // Interpolate values for all scenarios
          for (const scenario of Object.keys(previousDataPoint)) {
            if (scenario === "Year") continue; // Skip the Year key
            if (!dataPoint[scenario]) continue;
            // If the scenario exists in the previous year and the current year
            // Calculate value at crossing year using linear interpolation
            const slope =
              (dataPoint[scenario] - previousDataPoint[scenario]) /
              (dataPoint.Year - previousDataPoint.Year);
            const interpolatedValue =
              previousDataPoint[scenario] +
              slope * (year - previousDataPoint.Year);
            pointToAdd[scenario] = interpolatedValue;
          }
          pointsToAdd.push(pointToAdd);
        }
      }
      previousDataPoint = dataPoint;
    }

    for (const point of pointsToAdd) {
      finalChartData.push(point);
    }

    finalChartData.sort((a, b) => a.Year - b.Year);
    const result = finalChartData.map((dataPoint) => {
      return dataPoint.Year <= maxYear ? dataPoint : { Year: dataPoint.Year };
    });
    return result;
  }, [chartDataFilteredY, maxYear]);

  if (loading) {
    return (
      <div>
        <div>Loading chart data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div>Error: {error}</div>
      </div>
    );
  }

  if (chartDataFilteredXY.length === 0) {
    return (
      <div>
        <div>No data available to display chart.</div>
      </div>
    );
  }

  return (
    <div className="chartBody">
      <h1>Global mean sea level change relative to 1900</h1>
      <p>
        This chart illustrates observed (1950–2024) and projected (2025–2099)
        global sea level changes relative to the 1900 baseline. The projections
        are based on different greenhouse gas emission scenarios.
      </p>
      <div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartDataFilteredXY}
            margin={{ top: 20, right: 100, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="Year"
              type="number"
              domain={["dataMin", "dataMax"]}
              ticks={[
                1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2025, 2030,
                2040, 2050, 2060, 2070, 2080, 2090, 2100,
              ]} // Explicit X-axis ticks
              tickFormatter={(tick) => Math.round(tick)}
              stroke="#333"
              tick={{ fill: "#555", fontSize: 12 }}
              label={{
                value: "Year",
                position: "insideBottom",
                offset: -5,
                fill: "#333",
              }}
            />
            <YAxis
              stroke="#333"
              ticks={[0, 0.4, 0.6, 0.8, 1.0]} // Explicit Y-axis ticks
              tick={{ fill: "#555", fontSize: 12 }}
              label={{
                value: "Relative sea level (m)",
                angle: -90,
                position: "insideLeft",
                fill: "#333",
              }}
              domain={[0, 1]}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "14px",
                color: "#333",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "10px",
              }}
            />
            <Tooltip
              formatter={(value) => `${Math.round(value * 1000) / 1000} m`}
              labelFormatter={(label) => {
                if (Math.round(label) === label) {
                  return `Year: ${label}`;
                }
                // calculating the integer year and month
                const year = Math.floor(label);
                const month = Math.round((label - year) * 12);
                // month number to name
                const monthNames = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ];
                return `Year: ${year} ${monthNames[month]}.`;
              }}
            />
            {/* Render Lines for each scenario */}
            {scenarios.map((scenario, index) => (
              <Line
                key={scenario}
                type="linear"
                dataKey={scenario}
                stroke={lineColors[index % lineColors.length]}
                strokeWidth={2}
                dot={false}
                name={scenario}
                isAnimationActive={false} // Removed animation on refresh
                activeDot={false}
              />
            ))}

            {/* Render ReferenceLines for temperature thresholds */}
            {thresholds.map((thresh) => (
              <ReferenceLine
                key={`thresh-${thresh.value}`}
                y={thresh.value}
                stroke={"#333"}
                strokeDasharray="3 3"
                label={{
                  value: `${thresh.label} Threshold`,
                  position: "right",
                  fill: "#333",
                  fontSize: 12,
                }}
                isAnimationActive={false}
              />
            ))}

            {/* Render ReferenceDots for threshold crossing years on X-axis */}
            {scenarios.map(
              (
                scenario,
                scenarioIndex // Added scenarioIndex here
              ) =>
                thresholds.map((thresh) => {
                  if (thresh.value > maxSeaLevel) return null; // Skip thresholds above maxSeaLevel
                  const crossingYear =
                    scenarioThresholdCrossings[scenario]?.[thresh.value];
                  if (crossingYear) {
                    if (crossingYear > maxYear) return null; // Skip if crossing year is beyond maxYear
                    const IconComponentX = thresh.iconX;
                    const IconComponentY = thresh.iconY;
                    const iconColor =
                      lineColors[scenarioIndex % lineColors.length]; // Get the color of the scenario line
                    if (
                      blinkingScenarioForMaxTemp === scenario &&
                      thresh.value === maxSeaLevel &&
                      !blinker
                    ) {
                      return null; // Skip rendering if blinking is active for this scenario
                    }
                    return (
                      <Fragment key={thresh.label}>
                        {/* Dot slightly above X-axis */}
                        <ReferenceDot
                          key={`${scenario}-${thresh.value}-dot-above-x`}
                          x={crossingYear}
                          y={0.01}
                          r={0}
                          fill={iconColor}
                          stroke={iconColor}
                          isAnimationActive={false}
                          shape={<IconComponentX fill={iconColor} />}
                        >
                          <label
                            className="custom-dot-label"
                            style={{ fontSize: "10px", fill: "#333" }}
                          >
                            {`${scenario}: ${thresh.label} reached in ${crossingYear}`}
                          </label>
                        </ReferenceDot>

                        {/* Dot at the actual Y-value */}
                        <ReferenceDot
                          key={`${scenario}-${thresh.value}-dot-on-line`}
                          x={crossingYear}
                          y={thresh.value}
                          r={0}
                          fill={iconColor}
                          stroke={iconColor}
                          isAnimationActive={false}
                          shape={<IconComponentY fill={iconColor} />}
                        />
                      </Fragment>
                    );
                  }
                  return null;
                })
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="iconLegend">
        <FirstSeaIcon cx={14} cy={14} fill="#7F8CAA" />
        <p className="legendText">0.4m Threshold Reached</p>
        <SecondSeaIcon cx={14} cy={14} fill="#7F8CAA" />
        <p className="legendText">0.4m Threshold Reached</p>
        <ThirdSeaIcon cx={14} cy={14} fill="#7F8CAA" />
        <p className="legendText">0.4m Threshold Reached</p>
        <svg width="20" height="20" viewBox="0 0 20 20">
          <CircleIcon cx={10} cy={10} fill="#7F8CAA" />
        </svg>
        <p className="legendText">Scenario Line Crossing</p>
      </div>
    </div>
  );
}

export default Chart2;
