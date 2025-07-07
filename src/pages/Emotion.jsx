import { useState, useMemo } from "react";
import { useStore } from "../store";

// step is "pre" or "post"
function Emotion({ step }) {
  const [valence, setValence] = useState(0.5);
  const [arousal, setArousal] = useState(0.5);

  const [hasMovedArousal, setHasMovedArousal] = useState(false);
  const [hasMovedValence, setHasMovedValence] = useState(false);

  const storeEmotionInfo = useStore((state) => state.storeEmotionInfo);

  let direction = useMemo(() => {
    return Math.random() < 0.5 ? "column" : "column-reverse";
  }, []);

  const handleSubmit = () => {
    storeEmotionInfo(step, valence, arousal);
  };

  return (
    <>
      <h4 className="instructionText">
        Please rate how you feel about the climate change issue using{" "}
        <span>BOTH the sliders </span>(their order of appearance is random).{" "}
        <span>Don't think too much </span>about it, just{" "}
        <span>rate how you feel </span>when thinking about the issue.
      </h4>
      <div className="affectiveSlider" style={{ flexDirection: direction }}>
        <div className="sliderWrapper">
          <h4 className="sliderLabel">
            Level of Arousal (Displeasure-Pleasure)
          </h4>
          <div className="sliderContainer">
            <img src="/images/AS_unhappy.png" alt="Unhappy Icon" />
            <div className="slider">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={arousal}
                onChange={(e) => {
                  setArousal(e.target.value);
                  setHasMovedArousal(true);
                }}
              />
              <img src="/images/AS_intensity_cue.png" alt="Intensity Cue" />
            </div>
            <img src="/images/AS_happy.png" alt="Happy Icon" />
          </div>
        </div>
        <div className="sliderWrapper">
          <h4 className="sliderLabel">Level of Valence (Boring-Excited)</h4>
          <div className="sliderContainer">
            <img src="/images/AS_sleepy.png" alt="Sleepy Icon" />
            <div className="slider">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={valence}
                onChange={(e) => {
                  setValence(e.target.value);
                  setHasMovedValence(true);
                }}
              />
              <img src="/images/AS_intensity_cue.png" alt="Intensity Cue" />
            </div>
            <img src="/images/AS_wideawake.png" alt="Wideawake Icon" />
          </div>
        </div>
      </div>
      <div className="buttonContainer">
        <button
          className="userActionButton"
          disabled={!hasMovedArousal || !hasMovedValence}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default Emotion;
