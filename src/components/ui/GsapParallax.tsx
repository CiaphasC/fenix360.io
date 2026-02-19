import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';

interface GsapParallaxProps {
  children?: ReactNode;
  speed?: number;
  gsapReady: boolean;
  className?: string;
}

export function GsapParallax({ children, speed = 1, gsapReady, className = '' }: GsapParallaxProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!gsapReady || !elementRef.current || !elementRef.current.parentElement) {
      return;
    }

    const context = gsap.context(() => {
      if (!elementRef.current || !elementRef.current.parentElement) {
        return;
      }

      gsap.fromTo(
        elementRef.current,
        { y: `${15 * speed}%` },
        {
          y: `${-15 * speed}%`,
          ease: 'none',
          scrollTrigger: {
            trigger: elementRef.current.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });

    return () => {
      context.revert();
    };
  }, [gsapReady, speed]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
