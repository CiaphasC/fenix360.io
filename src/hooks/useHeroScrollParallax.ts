import { useLayoutEffect, type MutableRefObject } from 'react';
import { gsap } from 'gsap';

interface UseHeroScrollParallaxParams {
  isGsapReady: boolean;
  enabled: boolean;
  rootRef: MutableRefObject<HTMLDivElement | null>;
}

export function useHeroScrollParallax({
  isGsapReady,
  enabled,
  rootRef,
}: UseHeroScrollParallaxParams): void {
  useLayoutEffect(() => {
    if (!isGsapReady || !enabled || !rootRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      const createParallax = (settings: {
        bgFrom: number;
        bgTo: number;
        bgScaleTo: number;
        bgOpacityTo: number;
        contentTo: number;
        contentOpacityTo: number;
      }) => {
        const trigger = '.hero-scroll-section';

        gsap.fromTo(
          '.hero-bg-parallax',
          { yPercent: settings.bgFrom, scale: 1, opacity: 0.7 },
          {
            yPercent: settings.bgTo,
            scale: settings.bgScaleTo,
            opacity: settings.bgOpacityTo,
            ease: 'none',
            scrollTrigger: {
              trigger,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
            },
          },
        );

        gsap.fromTo(
          '.hero-content-parallax',
          { yPercent: 0, opacity: 1 },
          {
            yPercent: settings.contentTo,
            opacity: settings.contentOpacityTo,
            ease: 'none',
            scrollTrigger: {
              trigger,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
            },
          },
        );
      };

      media.add('(min-width: 768px)', () => {
        createParallax({
          bgFrom: 14,
          bgTo: -24,
          bgScaleTo: 1.12,
          bgOpacityTo: 0.42,
          contentTo: -14,
          contentOpacityTo: 0.62,
        });
      });

      media.add('(max-width: 767px)', () => {
        createParallax({
          bgFrom: 8,
          bgTo: -12,
          bgScaleTo: 1.06,
          bgOpacityTo: 0.5,
          contentTo: -8,
          contentOpacityTo: 0.78,
        });
      });

      return () => {
        media.revert();
      };
    }, rootRef);

    return () => {
      context.revert();
    };
  }, [enabled, isGsapReady, rootRef]);
}
