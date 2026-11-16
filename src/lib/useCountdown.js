import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Wall-clock based countdown: it stays accurate when the tab is in the
 * background, because it measures against an end timestamp instead of
 * counting ticks.
 */
export function useCountdown(durationMs, onExpire) {
  const [remaining, setRemaining] = useState(durationMs);
  const [running, setRunning] = useState(false);
  const endRef = useRef(0);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const left = Math.max(0, endRef.current - Date.now());
      setRemaining(left);
      if (left === 0) onExpireRef.current?.();
    }, 200);
    return () => clearInterval(id);
  }, [running]);

  const start = useCallback(() => {
    endRef.current = Date.now() + remaining;
    setRunning(true);
  }, [remaining]);

  const pause = useCallback(() => {
    setRemaining(Math.max(0, endRef.current - Date.now()));
    setRunning(false);
  }, []);

  const reset = useCallback(
    (keepRunning) => {
      endRef.current = Date.now() + durationMs;
      setRemaining(durationMs);
      setRunning(keepRunning);
    },
    [durationMs]
  );

  return { remaining, running, start, pause, reset };
}
