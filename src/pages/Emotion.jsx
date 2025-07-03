import { useState, useEffect } from "react";

function Emotion() {
  let [sliders, setsliders] = useState([]);

  useEffect(() => {
    let slider1 = (
      <div className="sliderWrapper">
        <h4 className="sliderLabel">Level of Arousal (Displeasure-Pleasure)</h4>
        <div className="sliderContainer">
          <img src="/images/AS_unhappy.png" alt="Unhappy Icon" />
          <div className="slider">
            <input type="range" />
            <img src="/images/AS_intensity_cue.png" alt="Intensity Cue" />
          </div>
          <img src="/images/AS_happy.png" alt="Happy Icon" />
        </div>
      </div>
    );
    let slider2 = (
      <div className="sliderWrapper">
        <h4 className="sliderLabel">Level of Valence (Boring-Excited)</h4>
        <div className="sliderContainer">
          <img src="/images/AS_sleepy.png" alt="Sleepy Icon" />
          <div className="slider">
            <input type="range" />
            <img src="/images/AS_intensity_cue.png" alt="Intensity Cue" />
          </div>
          <img src="/images/AS_wideawake.png" alt="Wideawake Icon" />
        </div>
      </div>
    );

    let initialsliders = [slider1, slider2];
    let shuffledsliders = [...initialsliders].sort(() => Math.random() - 0.5);

    setsliders(shuffledsliders);
  }, []);

  return (
    <>
      <h4 className="instructionText">
        Please rate how you feel about the climate change issue using{" "}
        <span>BOTH the sliders </span>(their order of appearance is random).{" "}
        <span>Don't think too much </span>about it, just{" "}
        <span>rate how you feel </span>when thinking about the issue.
      </h4>
      <div className="affectiveSlider">{sliders.map((slider) => slider)}</div>
      <div className="buttonContainer">
        <button className="userActionButton" disabled={true}>
          Submit
        </button>
      </div>
    </>
  );
}

export default Emotion;
