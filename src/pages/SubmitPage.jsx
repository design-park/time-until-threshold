import { useState } from "react";
import { useStore } from "../store"; // Import zustand store

function SubmitPage() {
  const submitted = useStore((state) => state.submitted);
  const storeResponse = useStore((state) => state.storeResponse);
  const setQuizCompleted = useStore((state) => state.setQuizCompleted);
  const getCurrentResponse = useStore((state) => state.getCurrentResponse);
  const handleSave = () => {
    storeResponse();
  };

  const handleExport = () => {
    const response = getCurrentResponse();
    const blob = new Blob([JSON.stringify(response, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "response.json";
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  };

  return (
    <div className="centerBody">
      <h1>Everything is complete!</h1>
      <p>Please "Save Response" to complete the process.</p>
      {submitted ? (
        <p style={{ color: "#4CAF50" }}>
          Your response has been saved successfully.
        </p>
      ) : (
        <button onClick={handleSave} className="userActionButton">
          Save Response
        </button>
      )}
      <p>
        If you did the experiment remotely, you may export your responses to
        send them to the team.
      </p>
      <button onClick={handleExport} className="userActionButton">
        Export Responses
      </button>
      <p>DEBUG</p>
      <button
        onClick={() => {
          setQuizCompleted(false);
        }}
        className="userActionButton"
      >
        Back to Quiz
      </button>
    </div>
  );
}

export default SubmitPage;
