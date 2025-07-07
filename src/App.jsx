import { Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro.jsx";
import Demography from "./pages/Demography.jsx";
import Emotion from "./pages/Emotion.jsx";
import TempDistance from "./pages/TempDistance.jsx";
import Willingness from "./pages/Willingness.jsx";
import SupportingInfo from "./pages/SupportingInfo.jsx";
import { useStore } from "./store.js";
import ChartPage from "./pages/ChartPage.jsx";
import SubmitPage from "./pages/SubmitPage.jsx";
import Test from "./Test.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

function Form() {
  const reset = useStore((state) => state.reset);
  const userID = useStore((state) => state.userID);
  if (!userID) {
    return <Intro />;
  }

  return (
    <div className="withToolbar">
      <div className="toolbar">
        <span>Participant ID: {userID}</span>
        <button onClick={reset}>Reset</button>
      </div>
      <div className="content">
        <NotIntroContent />
      </div>
    </div>
  );
}

function NotIntroContent() {
  const gender = useStore((state) => state.gender);
  const arousal = useStore((state) => state.arousal);
  const tempDistance1 = useStore((state) => state.tempDistance1);
  const societal1 = useStore((state) => state.societal1);
  const supportingInfoSeen = useStore((state) => state.supportingInfoSeen);
  const chartSeen = useStore((state) => state.chartSeen);
  const postArousal = useStore((state) => state.postArousal);
  const postTempDistance1 = useStore((state) => state.postTempDistance1);
  const postSocietal1 = useStore((state) => state.postSocietal1);

  if (!gender) {
    return <Demography />;
  } else if (arousal === null) {
    return <Emotion step="pre" />;
  } else if (tempDistance1 === null) {
    return <TempDistance step="pre" />;
  } else if (societal1 === null) {
    return <Willingness step="pre" />;
  } else if (!supportingInfoSeen) {
    return <SupportingInfo />;
  } else if (!chartSeen) {
    return <ChartPage />;
  } else if (postArousal === null) {
    return <Emotion step="post" />;
  } else if (postTempDistance1 === null) {
    return <TempDistance step="post" />;
  } else if (postSocietal1 === null) {
    return <Willingness step="post" />;
  } else {
    return <SubmitPage />;
  }
}

// return (
//   <div>
//     <Routes>
//       <Route path="/" element={<Intro />} />
//       <Route path="/demography" element={<Demography />} />
//       <Route path="/emotion/0" element={<Emotion />} />
//       <Route path="/temp-distance/0" element={<TempDistance />} />
//       <Route path="/willingness/0" element={<Willingness />} />
//       <Route path="/chart" element={<Chart />} />
//       <Route path="/animated-chart" element={<AnimatedChart />} />
//       <Route path="/supporting-info" element={<SupportingInfo />} />
//     </Routes>
//   </div>
// );

export default App;
