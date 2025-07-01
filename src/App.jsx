import React from "react";
import Chart from "./pages/Chart.jsx";
import Intro from "./pages/Intro.jsx";
import AnimatedChart from "./pages/AnimatedChart.jsx";
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Intro/>}/>
        <Route path="/chart" element={<Chart/>}/>
        <Route/>
      </Routes>
    </div>
  );
}

export default App;
