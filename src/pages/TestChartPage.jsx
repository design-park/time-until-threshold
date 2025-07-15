import AnimatedChart2 from "../components/AnimatedChart2";
import Chart2 from "../components/Chart2";
import { useStore } from "../store";

function ChartPage() {
  const condition = useStore((state) => state.condition);
  const setChartSeen = useStore((state) => state.setChartSeen);

  const handleSubmit = () => {
    setChartSeen(true);
  };

  return (
    <div className="centerBody">
      {condition === "control" ? <Chart2 /> : <AnimatedChart2 />}
      <div className="actionButtonContainer">
        <button className="userActionButton" onClick={handleSubmit}>
          Next
        </button>
      </div>
    </div>
  );
}

export default TestChartPage;
