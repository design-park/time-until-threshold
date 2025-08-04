import AnimatedChart from "../components/AnimatedChart";
import AnimatedChart2 from "../components/AnimatedChart2";
import Chart from "../components/Chart";
import Chart2 from "../components/Chart2";
import NewTraining from "./NewTraining";

function Test() {
  return (
    <div>
      <Chart2 showArrows={false} showText={false} showWarning={false} />

      <NewTraining />
      <hr />
      <Chart areasOption={0} arrowsOption={0} />
      <Chart2 areasOption={0} arrowsOption={0} />
      <AnimatedChart />
      <AnimatedChart2 />
    </div>
  );
}

export default Test;
