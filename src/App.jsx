// App.jsx
import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, ReferenceLine, ReferenceDot
} from 'recharts';
import {rawCsvData} from './data'; // Make sure the path to data.js is correct

// Function to parse CSV data from a string
function parseCsvString(csvString) {
  const lines = csvString.trim().split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  const data = lines.slice(1).map(line => {
    const values = line.split(',').map(value => value.trim());
    const row = {};
    headers.forEach((header, index) => {
      // Map 'Temperature' to 'Mean' and 'Scenario' to 'scenario'
      const mappedHeader = header === 'Temperature' ? 'Mean' :
                           header === 'Scenario' ? 'scenario' :
                           header;
      // Convert numeric values to numbers, keep others as strings
      row[mappedHeader] = isNaN(Number(values[index])) ? values[index] : Number(values[index]);
    });
    return row;
  });
  return data;
}

// Custom SVG Shapes for ReferenceDots
const CircleIcon = (props) => {
  const { cx, cy, fill } = props;
  return <circle cx={cx} cy={cy} r={6} fill={fill} stroke="#fff" strokeWidth={1.5} />;
};

const TriangleIcon = (props) => {
  const { cx, cy, fill } = props;
  // Equilateral triangle path
  return <path d={`M ${cx},${cy - 6} L ${cx - 6},${cy + 6} L ${cx + 6},${cy + 6} Z`} fill={fill} stroke="#fff" strokeWidth={1.5} />;
};

const DiamondIcon = (props) => {
  const { cx, cy, fill } = props;
  // Diamond shape path
  return <path d={`M ${cx},${cy - 6} L ${cx + 6},${cy} L ${cx},${cy + 6} L ${cx - 6},${cy} Z`} fill={fill} stroke="#fff" strokeWidth={1.5} />;
};


// Main React component for the application
function App() {
  const [chartData, setChartData] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Stores first year each scenario crosses a threshold: { 'SSP1-1.9': { '1.5': 2035, '2.0': null, '4.0': null }, ... }
  const [scenarioThresholdCrossings, setScenarioThresholdCrossings] = useState({});

  // Define an array of colors for the lines (re-ordered slightly for better visual distinction)
  const lineColors = [
    '#5d83f1',   // Blue
    '#82ca9d',   // Green
    '#ffc658',   // Yellow/Orange
    '#f17e5d',   // Coral
    '#8884d8',   // Purple
    '#f15d7e',   // Pink
    '#a4de6c',   // Light Green
    '#d0ed57',   // Lime Green
    '#88a8c3',   // Light Blue-Gray
    '#e3516e'    // Dark Pink
  ];

  // Define temperature thresholds and their corresponding icon types
  const thresholds = [
    { value: 1.5, label: '1.5°C', icon: CircleIcon },
    { value: 2.0, label: '2.0°C', icon: TriangleIcon },
    { value: 4.0, label: '4.0°C', icon: DiamondIcon }
  ];

  useEffect(() => {
    try {
      const rawData = parseCsvString(rawCsvData);

      if (rawData.length === 0) {
        setError("No data found or failed to parse CSV.");
        setLoading(false);
        return;
      }

      const uniqueScenarios = [...new Set(rawData.map(d => d.scenario))].sort();
      setScenarios(uniqueScenarios);

      const groupedData = rawData.reduce((acc, current) => {
        const year = current.Year;
        const scenario = current.scenario;
        const meanTemp = current.Mean;

        let yearEntry = acc.find(entry => entry.Year === year);
        if (!yearEntry) {
          yearEntry = { Year: year };
          acc.push(yearEntry);
        }
        yearEntry[scenario] = meanTemp;
        return acc;
      }, []);

      groupedData.sort((a, b) => a.Year - b.Year);
      setChartData(groupedData);

      // --- Calculate Threshold Crossing Years ---
      const crossings = {};
      uniqueScenarios.forEach(scenario => {
        crossings[scenario] = {};
        thresholds.forEach(thresh => {
          crossings[scenario][thresh.value] = null; // Initialize to null
        });

        // Track if a threshold has been crossed for the current scenario
        const hasCrossed = {};
        thresholds.forEach(thresh => {
          hasCrossed[thresh.value] = false;
        });

        for (const dataPoint of groupedData) {
          if (dataPoint[scenario] !== undefined) { // Ensure data exists for this scenario in this year
            const currentTemp = dataPoint[scenario];
            const currentYear = dataPoint.Year;

            thresholds.forEach(thresh => {
              if (!hasCrossed[thresh.value] && currentTemp >= thresh.value) {
                crossings[scenario][thresh.value] = currentYear;
                hasCrossed[thresh.value] = true;
              }
            });
          }
        }
      });
      setScenarioThresholdCrossings(crossings);
      setLoading(false);

    } catch (err) {
      setError("Failed to process data: " + err.message);
      setLoading(false);
    }
  }, []); // Empty dependency array means this effect runs once after initial render

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 font-inter">
        <div className="text-xl text-gray-700">Loading chart data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100 font-inter">
        <div className="text-xl text-red-700 p-4 rounded-lg border border-red-400">Error: {error}</div>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-yellow-100 font-inter">
        <div className="text-xl text-yellow-700">No data available to display chart.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-inter">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
        Global surface temperature change relative to 1850-1900
      </h1>
      <div className="w-full max-w-4xl bg-white p-4 sm:p-6 rounded-lg shadow-xl border border-gray-200">
        <ResponsiveContainer width="70%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="Year"
              type="number"
              domain={['dataMin', 'dataMax']}
              ticks={[1950, 2000, 2015, 2050, 2100]} // Explicit X-axis ticks
              tickFormatter={(tick) => Math.round(tick)}
              stroke="#333"
              tick={{ fill: '#555', fontSize: 12 }}
              label={{ value: 'Year', position: 'insideBottom', offset: -5, fill: '#333' }}
            />
            <YAxis
              stroke="#333"
              ticks={[0, 1, 1.5, 2, 3, 4, 5]} // Explicit Y-axis ticks
              tick={{ fill: '#555', fontSize: 12 }}
              label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fill: '#333' }}
              domain={[0, 5]}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '14px',
                color: '#333',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '10px'
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
            {thresholds.map(thresh => (
              <ReferenceLine
                key={`thresh-${thresh.value}`}
                y={thresh.value}
                stroke={"#333"} 
                strokeDasharray="3 3"
                label={{ value: `${thresh.label} Threshold`, position: 'right', fill: "#333", fontSize: 12 }}
                isAnimationActive={false}
              />
            ))}

            {/* Render ReferenceDots for threshold crossing years on X-axis */}
            {scenarios.map((scenario, scenarioIndex) => ( // Added scenarioIndex here
              thresholds.map(thresh => {
                const crossingYear = scenarioThresholdCrossings[scenario]?.[thresh.value];
                if (crossingYear) {
                  const IconComponent = thresh.icon;
                  const iconColor = lineColors[scenarioIndex % lineColors.length]; // Get the color of the scenario line
                  return (
                    <ReferenceDot
                      key={`${scenario}-${thresh.value}-dot`}
                      x={crossingYear}
                      y={0.1} // Position slightly above the X-axis for visibility
                      r={0} // Hide default circle radius as we use a custom shape
                      fill={iconColor} // Use the scenario's line color
                      stroke={iconColor} // Use the scenario's line color
                      isAnimationActive={false}
                      shape={<IconComponent fill={iconColor} />} // Pass the scenario's line color to the SVG icon
                    >
                      {/* Label appears on hover */}
                      <label className="custom-dot-label" style={{ fontSize: '10px', fill: '#333' }}>
                        {`${scenario}: ${thresh.label} reached in ${crossingYear}`}
                      </label>
                    </ReferenceDot>
                  );
                }
                return null;
              })
            ))}

          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-6 text-gray-600 text-center max-w-2xl text-sm">
        This chart displays global surface temperature changes relative to 1850-1900, derived from CMIP6 model simulations and observational constraints.
        Circles (●) indicate 1.5°C threshold crossings, triangles (▲) for 2.0°C, and diamonds (◆) for 4.0°C.
        Icons on the X-axis correspond to the color of the scenario line that reached the respective threshold.
      </p>
    </div>
  );
}

export default App;
