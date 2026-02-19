import { ChevronRight } from 'lucide-react';
import { GsapParallax } from '@/components/ui/GsapParallax';
import { GsapReveal } from '@/components/ui/GsapReveal';

interface QuoteSectionProps {
  gsapReady: boolean;
}

export function QuoteSection({ gsapReady }: QuoteSectionProps) {
  return (
    <section className="py-40 px-6 bg-white text-center relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <GsapReveal gsapReady={gsapReady} direction="up">
          <div className="w-[1px] h-32 bg-gray-200 mx-auto mb-12 relative overflow-hidden">
            <GsapParallax gsapReady={gsapReady} speed={2} className="absolute top-0 left-0 w-full h-1/2 bg-[#FF4D30]" />
          </div>

          <h3 className="text-2xl md:text-4xl font-serif text-gray-900 leading-tight mb-16">
            "Liderar es asumir responsabilidad antes que reconocimiento. <br className="hidden md:block" />
            <span className="text-gray-400 italic">Es tomar decisiones dificiles hoy.</span>"
          </h3>

          <button className="group inline-flex items-center justify-center gap-4 px-10 py-5 bg-[#FF4D30] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-colors duration-300 shadow-xl shadow-[#ff4d30]/20">
            Iniciar Conversacion
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </GsapReveal>
      </div>
    </section>
  );
}
