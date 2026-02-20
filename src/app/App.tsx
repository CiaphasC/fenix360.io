import { useCallback, useEffect, useRef, useState } from 'react';
import { CurtainOverlay } from '@/components/layout/CurtainOverlay';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { HorizontalScrollSection } from '@/components/layout/HorizontalScrollSection';
import { ConsultoriaSection } from '@/components/sections/ConsultoriaSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ManifiestoSection } from '@/components/sections/ManifiestoSection';
import { MentoriaCardsSection } from '@/components/sections/MentoriaCardsSection';
import { QuoteSection } from '@/components/sections/QuoteSection';
import { RisingEmbersBackground } from '@/components/three/RisingEmbersBackground';
import { useCurtainIntroAnimation } from '@/hooks/useCurtainIntroAnimation';
import { useGsapSetup } from '@/hooks/useGsapSetup';
import { useHeroIntroAnimation } from '@/hooks/useHeroIntroAnimation';
import { useHeroScrollParallax } from '@/hooks/useHeroScrollParallax';
import { useScrollLock } from '@/hooks/useScrollLock';
import { useScrollThreshold } from '@/hooks/useScrollThreshold';
import { scrollToSection } from '@/utils/scrollToSection';

export function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const gsapReady = useGsapSetup();
  const isScrolled = useScrollThreshold(30);

  const handleCurtainComplete = useCallback(() => {
    setIsIntroActive(false);
  }, []);

  const handleToggleMenu = useCallback(() => {
    setIsMenuOpen((previous) => !previous);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useCurtainIntroAnimation({
    isGsapReady: gsapReady,
    onStepChange: setIntroStep,
    onComplete: handleCurtainComplete,
  });

  useHeroIntroAnimation({
    isGsapReady: gsapReady,
    enabled: !isIntroActive,
    rootRef,
  });

  useHeroScrollParallax({
    isGsapReady: gsapReady,
    enabled: !isIntroActive,
    rootRef,
  });

  useEffect(() => {
    if (isIntroActive) {
      setIsMenuOpen(false);
    }
  }, [isIntroActive]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const closeMenuOnDesktop = () => {
      if (mediaQuery.matches) {
        setIsMenuOpen(false);
      }
    };

    closeMenuOnDesktop();
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', closeMenuOnDesktop);
    } else {
      mediaQuery.addListener(closeMenuOnDesktop);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', closeMenuOnDesktop);
      } else {
        mediaQuery.removeListener(closeMenuOnDesktop);
      }
    };
  }, []);

  useEffect(() => {
    const closeMenuOnHashChange = () => {
      setIsMenuOpen(false);

      const sectionId = window.location.hash.replace('#', '').trim();
      if (!sectionId) {
        return;
      }

      window.requestAnimationFrame(() => {
        scrollToSection(sectionId, { behavior: 'smooth', updateHash: false });
      });
    };

    window.addEventListener('hashchange', closeMenuOnHashChange);
    return () => {
      window.removeEventListener('hashchange', closeMenuOnHashChange);
    };
  }, []);

  useEffect(() => {
    const handleInternalAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link || link.target === '_blank' || link.hasAttribute('download')) {
        return;
      }

      const href = link.getAttribute('href');
      if (!href || href === '#') {
        return;
      }

      const sectionId = href.slice(1).trim();
      if (!sectionId || !document.getElementById(sectionId)) {
        return;
      }

      event.preventDefault();
      setIsMenuOpen(false);
      scrollToSection(sectionId, { behavior: 'smooth', updateHash: true });
    };

    document.addEventListener('click', handleInternalAnchorClick);
    return () => {
      document.removeEventListener('click', handleInternalAnchorClick);
    };
  }, []);

  useScrollLock(isIntroActive || isMenuOpen);

  return (
    <div
      ref={rootRef}
      className="bg-white text-gray-900 font-sans min-h-screen selection:bg-[#FF4D30] selection:text-white overflow-x-hidden relative"
    >
      <CurtainOverlay isActive={isIntroActive} introStep={introStep} />

      <div className={`transition-opacity duration-200 ${introStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <RisingEmbersBackground />

        <Header
          isMenuOpen={isMenuOpen}
          onToggleMenu={handleToggleMenu}
          onCloseMenu={handleCloseMenu}
          isScrolled={isScrolled}
        />

        <main className="relative z-10">
          <HeroSection />
          <MentoriaCardsSection gsapReady={gsapReady} />
          <HorizontalScrollSection
            gsapReady={gsapReady}
            labels={['Soluciones Ejecutivas', 'Manifiesto 2026']}
          >
            <div
              data-horizontal-slide="consultoria"
              className="w-full md:w-screen md:flex-shrink-0 md:h-full md:flex md:flex-col md:justify-center md:overflow-y-auto"
            >
              <ConsultoriaSection gsapReady={gsapReady} />
            </div>
            <div
              data-horizontal-slide="manifiesto"
              className="w-full md:w-screen md:flex-shrink-0 md:h-full md:flex md:flex-col md:justify-center md:overflow-y-auto"
            >
              <ManifiestoSection gsapReady={gsapReady} />
            </div>
          </HorizontalScrollSection>
          <QuoteSection gsapReady={gsapReady} />
        </main>

        <Footer gsapReady={gsapReady} />
      </div>
    </div>
  );
}
