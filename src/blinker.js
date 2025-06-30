import { useEffect, useState } from "react";

export const useBlinker = (delay) => {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOn((prev) => !prev);
    }, delay);

    return () => clearInterval(interval);
  }, [delay]);

  return isOn;
};
