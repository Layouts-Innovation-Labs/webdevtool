// src/hooks/useInactivityTimeout.ts
import { useCallback, useEffect, useRef, useState } from 'react';

const useInactivityTimeout = (
  timeout: number,
  onTimeout: () => void,
  onWarning: (remainingTime: number) => void,
  onCountdown: (remainingTime: number) => void
) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [remainingTime, setRemainingTime] = useState(timeout);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setRemainingTime(timeout);
    timerRef.current = setTimeout(onTimeout, timeout);
  }, [timeout, onTimeout]);

  const startCountdown = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1000) {
          clearInterval(timerRef.current!);
          onTimeout();
          return 0;
        }
        onCountdown(prev - 1000);
        return prev - 1000;
      });
    }, 1000);
  }, [onCountdown, onTimeout]);

  useEffect(() => {
    const handleActivity = () => {
      resetTimer();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    resetTimer();

    const warningTime = timeout - 30 * 1000; // 30 seconds before timeout
    const countdownTime = timeout - 5 * 1000; // 5 seconds before timeout

    const warningTimer = setTimeout(() => {
      onWarning(30 * 1000); // Notify 30 seconds before timeout
    }, warningTime);

    const countdownTimer = setTimeout(() => {
      startCountdown(); // Start countdown 5 seconds before timeout
    }, countdownTime);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      clearTimeout(warningTimer);
      clearTimeout(countdownTimer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [timeout, onTimeout, onWarning, onCountdown, resetTimer, startCountdown]);

  return remainingTime;
};

export default useInactivityTimeout;
