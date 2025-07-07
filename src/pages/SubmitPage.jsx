import { useState } from "react";
import { useStore } from "../store"; // Import zustand store

function SubmitPage() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const storeData = useStore((state) => state); // Access all data from the store
  const reset = useStore((state) => state.reset); // Function to reset the store
  const handleSubmit = async () => {
    setButtonClicked(true);
    try {
      const response = await fetch(
        "https://chardet.org/time-until-threshold/log.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(storeData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      console.log("Data submitted successfully");
      alert(
        "Thank you for your participation! Your responses have been recorded."
      );
      reset(); // Reset the store after successful submission
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="submit-page">
      <h1>Everything is complete!</h1>
      <p>Please click submit to send your responses.</p>
      <button onClick={handleSubmit} disabled={buttonClicked}>
        Submit
      </button>
    </div>
  );
}

export default SubmitPage;
