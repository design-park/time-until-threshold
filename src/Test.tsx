import AnimatedChart from "./components/AnimatedChart";
import Chart from "./components/Chart";
import Chart2 from "./components/Chart2";

function Test() {
  return (
    <div>
      <AnimatedChart option={1} />
      <Chart />
      <Chart areasOption={1} arrowsOption={1} />
      <Chart2 />
      <Chart2 areasOption={1} arrowsOption={1} />
    </div>
  );
}

export default Test;
