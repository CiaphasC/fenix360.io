import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import type { RevealDirection } from '@/types/content';

interface GsapRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  gsapReady: boolean;
  className?: string;
}

export function GsapReveal({
  children,
  direction = 'up',
  delay = 0,
  gsapReady,
  className = '',
}: GsapRevealProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!gsapReady || !elementRef.current) {
      return;
    }

    const context = gsap.context(() => {
      if (!elementRef.current) {
        return;
      }

      let y = 0;
      let x = 0;

      if (direction === 'up') {
        y = 40;
      }
      if (direction === 'down') {
        y = -40;
      }
      if (direction === 'left') {
        x = 40;
      }
      if (direction === 'right') {
        x = -40;
      }

      gsap.fromTo(
        elementRef.current,
        { y, x, autoAlpha: 0 },
        {
          y: 0,
          x: 0,
          autoAlpha: 1,
          duration: 0.8,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elementRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    });

    return () => {
      context.revert();
    };
  }, [delay, direction, gsapReady]);

  return (
    <div ref={elementRef} className={className} style={{ visibility: 'hidden' }}>
      {children}
    </div>
  );
}
