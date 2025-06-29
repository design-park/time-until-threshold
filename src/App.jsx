// App.jsx
import React, { useEffect } from "react";
import Chart from "./Chart";
import { useAnimatedValue } from "./animatedValue";

function App() {
  // Animate maxTemperature between 0.5 and 5
  const { value, play } = useAnimatedValue([1, 1.5, 2, 4, 5], 10000, 20);

  return (
    <div>
      <button
        onClick={() => {
          play();
        }}
      >
        Play
      </button>
      <Chart maxTemperature={value} />
      <Chart maxTemperature={5} />
    </div>
  );
}

export default App;
