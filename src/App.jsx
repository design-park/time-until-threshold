// App.jsx
import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';
import {rawCsvData} from './data';

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


// Main React component for the application
function App() {
  const [chartData, setChartData] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const rawData = parseCsvString(rawCsvData);

      if (rawData.length === 0) {
        setError("No data found or failed to parse CSV.");
        setLoading(false);
        return;
      }

      // Extract unique scenarios (now named 'scenario')
      const uniqueScenarios = [...new Set(rawData.map(d => d.scenario))].sort();
      setScenarios(uniqueScenarios);

      // Group data by Year and pivot for Recharts
      const groupedData = rawData.reduce((acc, current) => {
        const year = current.Year;
        const scenario = current.scenario;
        const meanTemp = current.Mean; // Now correctly mapped from 'Temperature'

        // Find or create the entry for the current year
        let yearEntry = acc.find(entry => entry.Year === year);
        if (!yearEntry) {
          yearEntry = { Year: year };
          acc.push(yearEntry);
        }
        // Add the mean temperature for the specific scenario to the year entry
        yearEntry[scenario] = meanTemp;
        return acc;
      }, []);

      // Sort data by year for correct line plotting
      groupedData.sort((a, b) => a.Year - b.Year);

      setChartData(groupedData);
      setLoading(false);
    } catch (err) {
      setError("Failed to process data: " + err.message);
      setLoading(false);
    }
  }, []); // Empty dependency array means this effect runs once after initial render

  // Define an array of colors for the lines
  const lineColors = [
    '#8884d8', '#82ca9d', '#ffc658', '#f17e5d', '#5d83f1', '#f15d7e',
    '#a4de6c', '#d0ed57', '#88a8c3', '#e3516e'
  ];

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
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
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
              ticks={[0, 1, 2, 3, 4, 5]} // Explicit Y-axis ticks
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
            {scenarios.map((scenario, index) => (
              <Line
                key={scenario}
                type="monotone"
                dataKey={scenario}
                stroke={lineColors[index % lineColors.length]}
                strokeWidth={2}
                dot={false}
                name={scenario}
                isAnimationActive={false} // <--- Added this line to remove animation
                activeDot={false}          // <--- Added this line to ensure no active dot on hover
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-6 text-gray-600 text-center max-w-2xl text-sm">
        This chart displays global surface temperature changes relative to 1850-1900, derived from CMIP6 model simulations and observational constraints.
      </p>
    </div>
  );
}

export default App;
