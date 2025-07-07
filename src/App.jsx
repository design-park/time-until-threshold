import { Routes, Route } from 'react-router-dom';
import Intro from "./pages/Intro.jsx";
import Demography from "./pages/Demography.jsx";
import Emotion from "./pages/Emotion.jsx";
import TempDistance from "./pages/TempDistance.jsx";
import Willingness from "./pages/Willingness.jsx";
import SupportingInfo from "./pages/SupportingInfo.jsx";
import Chart from "./pages/Chart.jsx";
import AnimatedChart from "./pages/AnimatedChart.jsx";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Intro/>}/>
        <Route path="/demography" element={<Demography/>}/>
        <Route path="/emotion/0" element={<Emotion/>}/>
        <Route path="/temp-distance/0" element={<TempDistance/>}/>
        <Route path="/willingness/0" element={<Willingness/>}/>
        <Route path="/chart" element={<Chart/>}/>
        <Route path="/animated-chart" element={<AnimatedChart/>}/>
        <Route path="/supporting-info" element={<SupportingInfo/>}/>
      </Routes>
    </div>
  );
}

export default App;
