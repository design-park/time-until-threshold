import { useEffect, useMemo, useRef, useState } from "react";

export const useAnimatedValue = (steps, duration, targetFps = 60) => {
  const [value, setValue] = useState(steps[0]);
  const index = useRef(0);
  const previousFrameTime = useRef(null);
  const elapsedTime = useRef(0);
  const [playing, setPlaying] = useState(false);
  const min = useMemo(() => steps[0], steps);
  const max = useMemo(() => steps[steps.length - 1], steps);
  const reset = useRef(true);

  useEffect(() => {
    setValue(steps[0]);
    index.current = 0;
    previousFrameTime.current = null;
    elapsedTime.current = 0;
    setPlaying(false);
    reset.current = true;
  }, [steps]);

  useEffect(() => {
    if (playing) {
      if (reset.current) {
        index.current = 0;
        elapsedTime.current = 0;
        reset.current = false;
      }
      previousFrameTime.current = Date.now();
    } else {
      previousFrameTime.current = null;
    }
  }, [playing]);

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (!playing || !previousFrameTime.current) return;
        const currentTime = Date.now();
        elapsedTime.current += currentTime - previousFrameTime.current;
        previousFrameTime.current = currentTime;
        console.warn("Elapsed Time:", elapsedTime.current);
        const lerp = elapsedTime.current / duration;
        let newValue = min + (max - min) * lerp;
        if (newValue >= steps[index.current + 1]) {
          newValue = steps[index.current + 1];
          setPlaying(false);
          previousFrameTime.current = null;
          index.current++;
          if (index.current >= steps.length - 1) {
            reset.current = true;
          }
        }
        setValue(newValue);
      },
      targetFps > 0 ? 1000 / targetFps : 1000
    );

    return () => clearInterval(interval);
  }, [playing, steps, duration]);

  return {
    value,
    play: () => setPlaying(true),
    pause: () => setPlaying(false),
    isPlaying: playing,
  };
};
