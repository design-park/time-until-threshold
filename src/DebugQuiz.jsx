import Quiz from "./pages/Quiz";

function DebugQuiz() {
  return (
    <div className="withToolbar">
      <div className="toolbar">DEBUG</div>
      <div className="content">
        <Quiz />
      </div>
    </div>
  );
}

export default DebugQuiz;
