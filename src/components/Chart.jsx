import React, { useState, useEffect, useMemo } from "react";
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
import { rawCsvData } from "../data";
import { useBlinker } from "../blinker";

// Function to parse CSV data from a string
function parseCsvString(csvString) {
  const lines = csvString.trim().split("\n");
  const headers = lines[0].split(",").map((header) => header.trim());
  const data = lines.slice(1).map((line) => {
    const values = line.split(",").map((value) => value.trim());
    const row = {};
    headers.forEach((header, index) => {
      // Map 'Temperature' to 'Mean' and 'Scenario' to 'scenario'
      const mappedHeader =
        header === "Temperature"
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
const CircleIcon = (props) => {
  const { cx, cy, fill } = props;
  const SCALE = 0.35;
  const width = 34.19 * SCALE;
  const height = 83.09 * SCALE;

  return (
    <svg
      x={cx - width / 2} // Adjust x position to center the shape
      y={cy - height} // Adjust y position to center the shape
      width={width} // Width of the original shape
      height={height} // Height of the original shape
      viewBox="0 0 34.19 83.09" // Original viewBox dimensions
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.02,52.08V9.93c0-5.47-4.45-9.93-9.93-9.93S7.17,4.45,7.17,9.93v42.16c-4.46,3.19-7.17,8.39-7.17,13.91,0,9.43,7.67,17.09,17.09,17.09s17.09-7.67,17.09-17.09c0-5.53-2.71-10.73-7.17-13.91h0ZM17.1,80.39c-7.95,0-14.39-6.44-14.39-14.39,0-5.32,2.88-9.95,7.17-12.44v-4.39h2.78v-1.92h-2.78v-7.27h2.78v-1.92h-2.78v-7.27h2.78v-1.92h-2.78v-7.27h2.78v-1.92h-2.78v-7.27h2.78v-1.92h-2.78v-.56c0-3.99,3.23-7.22,7.22-7.22s7.22,3.23,7.22,7.22v43.62c4.29,2.49,7.17,7.13,7.17,12.44,0,7.95-6.44,14.39-14.39,14.39h0ZM26.05,66c0,5.03-4.15,9.09-9.21,8.95-4.67-.13-8.56-4.02-8.69-8.69-.11-4.04,2.46-7.5,6.07-8.72v-11.96c0-1.25.75-2.36,1.95-2.73,1.98-.62,3.81.84,3.81,2.74v11.96c3.53,1.2,6.07,4.54,6.07,8.47Z"
        fill={fill}
        stroke="#fff"
        strokeWidth={1}
      />
    </svg>
  );
};

const TriangleIcon = (props) => {
  const { cx, cy, fill } = props;
  const SCALE = 0.35;
  const width = 34.19 * SCALE;
  const height = 83.09 * SCALE;

  return (
    <svg
      x={cx - width / 2} // Adjust x position to center the shape
      y={cy - height} // Adjust y position to center the shape
      width={width} // Width of the original shape
      height={height} // Height of the original shape
      viewBox="0 0 34.19 83.09" // Original viewBox dimensions
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.02,52.08V9.93c0-5.47-4.45-9.93-9.93-9.93S7.17,4.45,7.17,9.93v42.16c-4.46,3.19-7.17,8.39-7.17,13.91,0,9.43,7.67,17.09,17.09,17.09s17.09-7.67,17.09-17.09c0-5.53-2.71-10.73-7.17-13.91h0ZM17.1,80.39c-7.95,0-14.39-6.44-14.39-14.39,0-5.32,2.88-9.95,7.17-12.44v-4.39h2.78v-1.92h-2.78v-7.27h2.78v-1.92h-2.78v-7.27h2.78v-1.92h-2.78v-7.27h2.78v-1.92h-2.78v-7.27h2.78v-1.92h-2.78v-.56c0-3.99,3.23-7.22,7.22-7.22s7.22,3.23,7.22,7.22v43.62c4.29,2.49,7.17,7.13,7.17,12.44,0,7.95-6.44,14.39-14.39,14.39h0ZM26.05,66c0,4.94-4.01,8.95-8.95,8.95s-8.95-4.01-8.95-8.95c0-3.93,2.54-7.27,6.07-8.47v-28.53c0-1.59,1.29-2.88,2.88-2.88s2.88,1.29,2.88,2.88v28.53c3.53,1.2,6.07,4.54,6.07,8.47Z"
        fill={fill}
        stroke="#fff"
        strokeWidth={1}
      />
    </svg>
  );
};

const DiamondIcon = (props) => {
  const { cx, cy, fill } = props;
  const SCALE = 0.35;
  const width = 34.19 * SCALE;
  const height = 83.09 * SCALE;

  return (
    <svg
      x={cx - width / 2} // Adjust x position to center the shape
      y={cy - height} // Adjust y position to center the shape
      width={width} // Width of the original shape
      height={height} // Height of the original shape
      viewBox="0 0 34.19 83.09" // Original viewBox dimensions
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.02,52.08V9.93c0-5.47-4.45-9.93-9.93-9.93S7.17,4.45,7.17,9.93v42.16c-4.46,3.19-7.17,8.39-7.17,13.91,0,9.43,7.67,17.09,17.09,17.09s17.09-7.67,17.09-17.09c0-5.53-2.71-10.73-7.17-13.91h0ZM17.1,80.39c-7.95,0-14.39-6.44-14.39-14.39,0-5.32,2.88-9.95,7.17-12.44v-4.39h2.78v-1.92h-2.78v-7.27h2.78v-1.92h-2.78v-7.27h2.78v-1.92h-2.78v-7.27h2.78v-1.92h-2.78v-7.27h2.78v-1.92h-2.78v-.56c0-3.99,3.23-7.22,7.22-7.22s7.22,3.23,7.22,7.22v43.62c4.29,2.49,7.17,7.13,7.17,12.44,0,7.95-6.44,14.39-14.39,14.39h0ZM26.05,66c0,4.94-4.01,8.95-8.95,8.95s-8.95-4.01-8.95-8.95c0-3.93,2.54-7.27,6.07-8.47V9.16c0-1.59,1.29-2.88,2.88-2.88s2.88,1.29,2.88,2.88v48.37c3.53,1.2,6.07,4.54,6.07,8.47Z"
        fill={fill}
        stroke="#fff"
        strokeWidth={1}
      />
    </svg>
  );
};

// Main React component for the application
function Chart({
  maxTemperature = 5,
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
    "#5d83f1", // Blue
    "#82ca9d", // Green
    "#ffc658", // Yellow/Orange
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
    { value: 1.5, label: "1.5°C", icon: CircleIcon },
    { value: 2.0, label: "2.0°C", icon: TriangleIcon },
    { value: 4.0, label: "4.0°C", icon: DiamondIcon },
  ];

  useEffect(() => {
    try {
      const rawData = parseCsvString(rawCsvData);

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
        const meanTemp = current.Mean;

        let yearEntry = acc.find((entry) => entry.Year === year);
        if (!yearEntry) {
          yearEntry = { Year: year };
          acc.push(yearEntry);
        }
        yearEntry[scenario] = meanTemp;
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
            const currentTemp = dataPoint[scenario];
            const currentYear = dataPoint.Year;

            for (const thresh of thresholds) {
              if (!hasCrossed[thresh.value] && currentTemp >= thresh.value) {
                // Determine when the threshold is crossed using linear interpolation
                if (previousDataPoint !== null) {
                  // Calculate the crossing year (floating point) using linear interpolation
                  const slope =
                    (currentTemp - previousDataPoint[scenario]) /
                    (currentYear - previousDataPoint.Year);
                  const intercept = currentTemp - slope * currentYear;
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
        if (dataPoint[scenario] > maxTemperature && previousDataPoint) {
          // Create a new point with the maxTemperature value as temperature (year is floating point, linear interpolation)
          const crossingYear =
            previousDataPoint.Year +
            ((maxTemperature - previousDataPoint[scenario]) /
              (dataPoint[scenario] - previousDataPoint[scenario])) *
              (dataPoint.Year - previousDataPoint.Year);

          const newPoint = {
            Year: crossingYear,
            [scenario]: maxTemperature,
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
  }, [fullChartData, maxTemperature]);

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
    return finalChartData.map((dataPoint) => {
      return dataPoint.Year <= maxYear ? dataPoint : { Year: dataPoint.Year };
    });
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
      <h1>Global surface temperature change relative to 1850-1900</h1>
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
                1950, 1960, 1970, 1980, 1990, 2000, 2010, 2015, 2020, 2030,
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
              ticks={[0, 1, 1.5, 2, 3, 4, 5]} // Explicit Y-axis ticks
              tick={{ fill: "#555", fontSize: 12 }}
              label={{
                value: "Relative temperature (°C)",
                angle: -90,
                position: "insideLeft",
                fill: "#333",
              }}
              domain={[0, 5]}
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
              formatter={(value) => `${Math.round(value * 1000) / 1000} °C`}
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
                type="monotone"
                dataKey={scenario}
                stroke={lineColors[index % lineColors.length]}
                strokeWidth={2}
                dot={false}
                name={scenario}
                isAnimationActive={false} // Removed animation on refresh
                activeDot={true}
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
                  if (thresh.value > maxTemperature) return null; // Skip thresholds above maxTemperature
                  const crossingYear =
                    scenarioThresholdCrossings[scenario]?.[thresh.value];
                  if (crossingYear) {
                    if (crossingYear > maxYear) return null; // Skip if crossing year is beyond maxYear
                    const IconComponent = thresh.icon;
                    const iconColor =
                      lineColors[scenarioIndex % lineColors.length]; // Get the color of the scenario line
                    if (
                      blinkingScenarioForMaxTemp === scenario &&
                      thresh.value === maxTemperature &&
                      !blinker
                    ) {
                      return null; // Skip rendering if blinking is active for this scenario
                    }
                    return (
                      <>
                        {/* Dot slightly above X-axis */}
                        <ReferenceDot
                          key={`${scenario}-${thresh.value}-dot-above-x`}
                          x={crossingYear}
                          y={0.1}
                          r={0}
                          fill={iconColor}
                          stroke={iconColor}
                          isAnimationActive={false}
                          shape={<IconComponent fill={iconColor} />}
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
                          y={thresh.value} // you need to implement this function
                          r={0}
                          fill={iconColor}
                          stroke={iconColor}
                          isAnimationActive={false}
                          shape={<IconComponent fill={iconColor} />}
                        />
                      </>
                    );
                  }
                  return null;
                })
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-6 text-gray-600 text-center max-w-2xl text-sm">
        This chart illustrates global surface temperature changes, relative to
        the 1850-1900 baseline, as projected by CMIP6 model simulations.
        Threshold crossings are indicated by specific markers: circles (●) for
        1.5°C, triangles (▲) for 2.0°C, and diamonds (◆) for 4.0°C. The color of
        each marker on the x-axis corresponds to the color of the scenario line
        that reached that particular threshold.
      </p>
    </div>
  );
}

export default Chart;
