import AnimatedChart from "../components/AnimatedChart";
import Chart from "../components/Chart";
import { useStore } from "../store";

function ChartPage() {
  const condition = useStore((state) => state.condition);
  const setChartSeen = useStore((state) => state.setChartSeen);

  const handleSubmit = () => {
    setChartSeen(true);
  };

  return (
    <div className="centerBody">
      {condition === "control" ? <Chart /> : <AnimatedChart />}
      <div className="actionButtonContainer">
        <button className="userActionButton" onClick={handleSubmit}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ChartPage;
