import { useEffect, useRef } from 'react';

interface UseCurtainIntroAnimationParams {
  isGsapReady: boolean;
  onStepChange?: (step: number) => void;
  onComplete?: () => void;
}

export function useCurtainIntroAnimation({
  isGsapReady,
  onStepChange,
  onComplete,
}: UseCurtainIntroAnimationParams): void {
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!isGsapReady || hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;
    let isCancelled = false;
    const timeouts: number[] = [];

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const timeoutId = window.setTimeout(resolve, ms);
        timeouts.push(timeoutId);
      });

    const playSequence = async () => {
      onStepChange?.(0);
      await wait(200);
      if (isCancelled) {
        return;
      }
      onStepChange?.(1);

      await wait(1400);
      if (isCancelled) {
        return;
      }
      onStepChange?.(2);

      await wait(400);
      if (isCancelled) {
        return;
      }
      onStepChange?.(3);

      await wait(600);
      if (isCancelled) {
        return;
      }
      onStepChange?.(4);
      onComplete?.();
    };

    playSequence();

    return () => {
      isCancelled = true;
      timeouts.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, [isGsapReady, onComplete, onStepChange]);
}
