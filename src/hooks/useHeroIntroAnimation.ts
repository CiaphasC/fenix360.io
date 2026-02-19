import { useLayoutEffect, useRef, type MutableRefObject } from 'react';
import { gsap } from 'gsap';

interface UseHeroIntroAnimationParams {
  isGsapReady: boolean;
  enabled: boolean;
  rootRef: MutableRefObject<HTMLDivElement | null>;
}

export function useHeroIntroAnimation({
  isGsapReady,
  enabled,
  rootRef,
}: UseHeroIntroAnimationParams): void {
  const hasPlayedRef = useRef(false);

  useLayoutEffect(() => {
    if (!isGsapReady || !enabled || !rootRef.current || hasPlayedRef.current) {
      return;
    }

    hasPlayedRef.current = true;

    const context = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .fromTo(
          '.header-shell',
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        )
        .fromTo(
          '.hero-line',
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 1, ease: 'expo.out' },
          '-=0.5',
        )
        .fromTo(
          '.hero-title-line',
          { y: 100, opacity: 0, rotateX: -20 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.1, duration: 1.2, ease: 'power4.out' },
          '-=0.5',
        )
        .fromTo(
          '.hero-desc',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
          '-=0.8',
        )
        .fromTo(
          '.hero-btn',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
          '-=0.6',
        );
    }, rootRef);

    return () => {
      context.revert();
    };
  }, [enabled, isGsapReady, rootRef]);
}
