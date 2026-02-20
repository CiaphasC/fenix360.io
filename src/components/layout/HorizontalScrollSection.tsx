import { useLayoutEffect, useRef, type ReactNode, Children, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface HorizontalScrollSectionProps {
  gsapReady: boolean;
  children: ReactNode;
  labels?: string[];
}

export function HorizontalScrollSection({
  gsapReady,
  children,
  labels = [],
}: HorizontalScrollSectionProps) {
  const containerRef   = useRef<HTMLDivElement>(null);
  const stripRef       = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressDotRef = useRef<HTMLDivElement>(null);
  const counterCurRef  = useRef<HTMLSpanElement>(null);
  const labelRef       = useRef<HTMLSpanElement>(null);
  const overlayRef     = useRef<HTMLDivElement>(null);

  const slideCount = Children.count(children);

  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useLayoutEffect(() => {
    if (!gsapReady || !containerRef.current || !stripRef.current) return;

    const strip  = stripRef.current;
    const slides = Array.from(strip.querySelectorAll<HTMLElement>(':scope > div'));

    /* ── helper: limpia TODOS los estilos inline GSAP en slides y sections ── */
    const clearAll = () => {
      gsap.set(strip, { clearProps: 'all' });
      slides.forEach(slide => {
        gsap.set(slide, { clearProps: 'all' });
        const inner = slide.querySelector<HTMLElement>('section');
        if (inner) gsap.set(inner, { clearProps: 'all' });
      });
    };

    /* ── MODO MÓVIL: asegura que todo esté visible y sin estilos residuales ── */
    if (!isDesktop) {
      clearAll();
      ScrollTrigger.refresh();
      return () => {
        clearAll();
      };
    }

    /* ── MODO DESKTOP: animación premium horizontal ── */

    /* Estado inicial */
    slides.forEach((slide, i) => {
      if (i === 0) {
        gsap.set(slide, { clipPath: 'inset(0 0% 0 0)' });
        const inner = slide.querySelector<HTMLElement>('section');
        if (inner) gsap.set(inner, { scale: 1, filter: 'blur(0px)', opacity: 1 });
      } else {
        gsap.set(slide, { clipPath: 'inset(0 100% 0 0)' });
        const inner = slide.querySelector<HTMLElement>('section');
        if (inner) gsap.set(inner, { scale: 0.95, filter: 'blur(6px)', opacity: 0.2 });
      }
    });

    const getScrollAmount = () => -(strip.scrollWidth - window.innerWidth);

    const ctx = gsap.context(() => {
      const mainTween = gsap.to(strip, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          id: 'horizontal-sections',
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${Math.abs(getScrollAmount())}`,
          scrub: 1.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          onUpdate(self) {
            const p = self.progress;

            if (progressBarRef.current) gsap.set(progressBarRef.current, { scaleX: p });
            if (progressDotRef.current) gsap.set(progressDotRef.current, { left: `${p * 100}%` });

            const snapIndex = Math.round(p * (slideCount - 1));
            if (counterCurRef.current) {
              counterCurRef.current.textContent = String(snapIndex + 1).padStart(2, '0');
            }
            if (labelRef.current && labels[snapIndex]) {
              const nextLabel = labels[snapIndex];
              if (labelRef.current.textContent !== nextLabel) {
                gsap.to(labelRef.current, {
                  y: -8, opacity: 0, duration: 0.18, ease: 'power2.in',
                  onComplete() {
                    if (labelRef.current) labelRef.current.textContent = nextLabel;
                    gsap.fromTo(labelRef.current,
                      { y: 8, opacity: 0 },
                      { y: 0, opacity: 1, duration: 0.22, ease: 'power2.out' }
                    );
                  },
                });
              }
            }

            slides.forEach((slide, i) => {
              const center    = i / (slideCount - 1 || 1);
              const distance  = Math.abs(p - center);
              const visible   = Math.max(0, 1 - distance * (slideCount - 1) * 1.6);
              const clipRight = p < center ? Math.max(0, 100 - visible * 100) : 0;
              gsap.set(slide, { clipPath: `inset(0 ${clipRight.toFixed(1)}% 0 0)` });
              const inner = slide.querySelector<HTMLElement>('section');
              if (inner) {
                gsap.set(inner, {
                  scale:   0.95 + 0.05 * visible,
                  filter:  `blur(${(8 * (1 - visible)).toFixed(1)}px)`,
                  opacity: 0.2 + 0.8 * visible,
                });
              }
            });

            if (overlayRef.current) gsap.set(overlayRef.current, { opacity: p * 0.08 });
          },
        },
      });

      ScrollTrigger.addEventListener('refreshInit', () => { mainTween.invalidate(); });
    });

    return () => {
      ctx.revert();
      /* Limpia estilos residuales de onUpdate (fuera del context) */
      clearAll();
      ScrollTrigger.refresh();
    };
  }, [gsapReady, isDesktop, slideCount, labels]);

  /* ─────────────────────────────────────────────
     RENDER ÚNICO — sin conditional render
     El DOM siempre existe; solo cambian las clases
     y GSAP se activa/desactiva según isDesktop
  ───────────────────────────────────────────── */
  return (
    <div className="relative">

      {/* overlay — oculto en móvil */}
      <div
        ref={overlayRef}
        className={`absolute inset-0 z-40 pointer-events-none bg-[#FF4D30] ${isDesktop ? '' : 'hidden'}`}
        style={{ opacity: 0 }}
      />

      {/* barra de progreso + dot — oculta en móvil */}
      <div className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gray-200 z-50 ${isDesktop ? '' : 'hidden'}`}>
        <div
          ref={progressBarRef}
          className="h-full bg-[#FF4D30] origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
        <div
          ref={progressDotRef}
          className="absolute -top-[3px] -translate-x-1/2 w-[7px] h-[7px] rounded-full bg-[#FF4D30]"
          style={{ left: '0%' }}
        />
      </div>

      {/* HUD — oculto en móvil */}
      <div className={`absolute bottom-7 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 pointer-events-none ${isDesktop ? '' : 'hidden'}`}>
        <div className="overflow-hidden">
          <span
            ref={labelRef}
            className="block text-[10px] font-bold tracking-[0.25em] uppercase text-gray-400"
          >
            {labels[0] ?? ''}
          </span>
        </div>
        <div className="flex items-end gap-1">
          <span ref={counterCurRef} className="text-2xl font-serif text-gray-900 leading-none tabular-nums">
            01
          </span>
          <span className="text-xs text-gray-300 mb-1 font-light">
            /{String(slideCount).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* strip: horizontal en desktop, columna en móvil */}
      <div
        ref={containerRef}
        className={isDesktop ? 'overflow-hidden w-full h-screen' : 'overflow-visible w-full'}
      >
        <div
          ref={stripRef}
          className={isDesktop ? 'flex h-full will-change-transform' : 'flex flex-col'}
        >
          {children}
        </div>
      </div>

    </div>
  );
}
