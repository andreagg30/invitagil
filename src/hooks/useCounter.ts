import { useEffect, useRef, useState } from "react";

export function useCounter(seconds: number) {
  const [counter, setCounter] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<number | null>(null);

  const startCounter = () => {
    if (isRunning) return;

    setCounter(seconds);
    setIsRunning(true);
  };

  const stopCounter = () => {
    setIsRunning(false);
    setCounter(seconds);
  };

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = window.setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return seconds;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, seconds]);

  return {
    counter,
    isRunning,
    startCounter,
    stopCounter,
  };
}