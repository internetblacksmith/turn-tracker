import { useEffect, useRef } from "react";

interface HoldHandlers {
  onPointerDown: () => void;
  onPointerUp: () => void;
  onPointerLeave: () => void;
}

export const useHoldToRepeat = (
  callback: () => void,
  initialDelay = 400,
  repeatInterval = 100
): HoldHandlers => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });

  const start = () => {
    callbackRef.current();
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => callbackRef.current(), repeatInterval);
    }, initialDelay);
  };

  const stop = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    return () => stop();
  }, []);

  return { onPointerDown: start, onPointerUp: stop, onPointerLeave: stop };
};
