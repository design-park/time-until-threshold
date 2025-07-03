import Intro from "./pages/Intro.jsx";
import Demography from "./pages/Demography.jsx";
import Emotion from "./pages/Emotion.jsx";
import Chart from "./pages/Chart.jsx";
import AnimatedChart from "./pages/AnimatedChart.jsx";
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Intro/>}/>
        <Route path="/demography" element={<Demography/>}/>
        <Route path="/emotion/0" element={<Emotion/>}/>
        <Route path="/chart" element={<Chart/>}/>
        <Route path="/animated-chart" element={<AnimatedChart/>}/>
      </Routes>
    </div>
  );
}

export default App;
