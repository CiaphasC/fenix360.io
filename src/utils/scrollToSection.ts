interface ScrollToSectionOptions {
  behavior?: ScrollBehavior;
  updateHash?: boolean;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function scrollToSection(sectionId: string, options: ScrollToSectionOptions = {}): boolean {
  const { behavior = 'smooth', updateHash = true } = options;
  const targetSection = document.getElementById(sectionId);

  if (!targetSection) {
    return false;
  }

  const isDesktop = window.matchMedia('(min-width: 768px)').matches;
  const horizontalSlide = document.querySelector<HTMLElement>(`[data-horizontal-slide="${sectionId}"]`);

  if (isDesktop && horizontalSlide) {
    const strip = horizontalSlide.parentElement as HTMLElement | null;
    const container = strip?.parentElement as HTMLElement | null;

    if (strip && container) {
      const slides = Array.from(strip.children);
      const slideIndex = slides.indexOf(horizontalSlide);

      if (slideIndex >= 0 && slides.length > 1) {
        const progress = slideIndex / (slides.length - 1);
        const scrollAmount = Math.max(0, strip.scrollWidth - window.innerWidth);
        const containerTop = container.getBoundingClientRect().top + window.scrollY;
        const edgeBuffer = Math.min(64, Math.max(24, window.innerHeight * 0.08));

        let targetTop = containerTop + scrollAmount * progress;
        if (slideIndex === slides.length - 1) {
          // Keep destination inside the pinned horizontal range to avoid landing on the blank handoff zone.
          targetTop -= edgeBuffer;
        }
        targetTop = clamp(targetTop, containerTop + 1, containerTop + Math.max(1, scrollAmount - 1));

        window.scrollTo({ top: targetTop, behavior });

        if (updateHash && window.location.hash !== `#${sectionId}`) {
          window.history.replaceState(null, '', `#${sectionId}`);
        }
        return true;
      }
    }
  }

  targetSection.scrollIntoView({ behavior, block: 'start' });

  if (updateHash && window.location.hash !== `#${sectionId}`) {
    window.history.replaceState(null, '', `#${sectionId}`);
  }

  return true;
}
