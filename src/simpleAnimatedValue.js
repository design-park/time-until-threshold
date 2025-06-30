import { useEffect, useRef, useState } from "react";

export const useSimpleAnimatedValue = (
  initial,
  final,
  duration,
  targetFps = 60,
  loop = false
) => {
  const [value, setValue] = useState(initial);
  const previousFrameTime = useRef(null);
  const elapsedTime = useRef(0);
  const [playing, setPlaying] = useState(false);
  const reset = useRef(true);

  useEffect(() => {
    setValue(initial);
    previousFrameTime.current = null;
    elapsedTime.current = 0;
    setPlaying(false);
    reset.current = true;
  }, [initial, final]);

  useEffect(() => {
    if (playing) {
      if (reset.current) {
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
        const lerp = elapsedTime.current / duration;
        let newValue = initial + (final - initial) * lerp;
        if (newValue >= final) {
          if (loop) {
            newValue = initial;
            elapsedTime.current = 0;
          } else {
            newValue = final;
            setPlaying(false);
            previousFrameTime.current = null;
            reset.current = true;
          }
        }
        setValue(newValue);
      },
      targetFps > 0 ? 1000 / targetFps : 1000
    );

    return () => clearInterval(interval);
  }, [playing, duration, loop, initial, final]);

  return {
    value,
    play: () => setPlaying(true),
    pause: () => setPlaying(false),
    isPlaying: playing,
  };
};
