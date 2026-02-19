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
import { useScrollLock } from '@/hooks/useScrollLock';
import { useScrollThreshold } from '@/hooks/useScrollThreshold';

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
    };

    window.addEventListener('hashchange', closeMenuOnHashChange);
    return () => {
      window.removeEventListener('hashchange', closeMenuOnHashChange);
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
            <div className="w-full md:w-screen md:flex-shrink-0 md:h-full md:flex md:flex-col md:justify-center md:overflow-y-auto">
              <ConsultoriaSection gsapReady={gsapReady} />
            </div>
            <div className="w-full md:w-screen md:flex-shrink-0 md:h-full md:flex md:flex-col md:justify-center md:overflow-y-auto">
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
