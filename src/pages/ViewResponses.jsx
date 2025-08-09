import { useMemo, useState } from "react";
import Papa from "papaparse";
import { useStore } from "../store";

function ViewResponses() {
  const storedResponses = useStore((state) => state.storedResponses);
  const deleteAllResponses = useStore((state) => state.deleteAllResponses);
  const handleExportAsJSON = () => {
    const blob = new Blob([JSON.stringify(storedResponses, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "responses.json";
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  };
  const handleExportAsCSV = () => {
    const csvContent = Papa.unparse(storedResponses);

    const blob = new Blob([csvContent], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "responses.csv";
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  };

  return (
    <div style={{ padding: "20px", paddingTop: "0" }}>
      <h1>All Responses</h1>
      <button onClick={handleExportAsJSON} className="userActionButton">
        Export as JSON
      </button>
      <span style={{ margin: "0 10px" }}></span>
      <button onClick={handleExportAsCSV} className="userActionButton">
        Export as CSV
      </button>
      <span style={{ margin: "0 10px" }}></span>
      <button
        className="userActionButton"
        onClick={() => {
          const confirmed = window.confirm(
            "Are you sure you want to delete all responses?"
          );
          if (confirmed) {
            deleteAllResponses();
          }
        }}
        style={{ backgroundColor: "#e14343ff", color: "white" }}
      >
        Delete All Responses
      </button>
      <ul>
        {storedResponses.map((response, index) => (
          <li key={index}>
            <ResponseItem response={response} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ResponseItem({ response }) {
  const deleteResponseWithID = useStore((state) => state.deleteResponseWithID);
  const handleDeleteResponse = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete response with User ID: ${response.userID}?`
    );
    if (confirmed) {
      deleteResponseWithID(response.userID);
    }
  };
  const [visible, setVisible] = useState(false);
  const json = useMemo(() => JSON.stringify(response, null, 2), [response]);
  return (
    <>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "-" : "+"}
      </button>{" "}
      User ID: {response.userID} ({response.condition}){" "}
      <button
        onClick={handleDeleteResponse}
        style={{ backgroundColor: "#e14343ff", color: "white" }}
      >
        delete
      </button>
      {visible && (
        <>
          <br />
          <textarea
            value={json}
            readOnly
            style={{ width: "100%", height: "200px" }}
          />
        </>
      )}
    </>
  );
}

export default ViewResponses;
