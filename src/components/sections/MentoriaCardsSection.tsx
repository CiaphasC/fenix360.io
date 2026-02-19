import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, Quote, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { GsapReveal } from '@/components/ui/GsapReveal';
import { PhoenixIcon } from '@/components/icons/PhoenixIcon';
import { mentoriaCards } from '@/data/site-content';

interface MentoriaCardsSectionProps {
  gsapReady: boolean;
}

export function MentoriaCardsSection({ gsapReady }: MentoriaCardsSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!gsapReady || !containerRef.current) {
      return;
    }

    const context = gsap.context(() => {
      if (!containerRef.current) {
        return;
      }

      const items = containerRef.current.querySelectorAll('.bento-item');

      gsap.fromTo(
        items,
        { y: 60, autoAlpha: 0, scale: 0.98 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    });

    return () => {
      context.revert();
    };
  }, [gsapReady]);

  return (
    <section id="mentoria" className="py-32 px-6 bg-[#050505] text-white relative z-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF4D30] opacity-[0.03] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900 opacity-[0.02] blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <GsapReveal gsapReady={gsapReady} direction="up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles size={14} className="text-[#FF4D30]" />
                <span className="text-[#FF4D30] font-bold tracking-[0.3em] text-[10px] uppercase">Mindset Fenix</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
                Cartas de <span className="text-gray-600 italic font-light">Poder</span>
              </h2>
            </div>
            <p className="max-w-md text-gray-500 font-light mt-8 md:mt-0 text-sm leading-relaxed border-l border-gray-800 pl-6">
              La transformacion del negocio es un reflejo directo de la transformacion mental del lider. Recordatorios
              estrategicos para la alta direccion.
            </p>
          </div>
        </GsapReveal>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {mentoriaCards.map((card, index) => (
            <div
              key={`${card.title}-${index}`}
              className={`bento-item group relative p-8 md:p-12 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-[#FF4D30]/30 transition-all duration-700 overflow-hidden flex flex-col justify-between min-h-[300px] md:min-h-[380px] ${card.span} invisible`}
            >
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF4D30] opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-700 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 group-hover:text-[#FF4D30] transition-colors">
                    0{index + 1} - {card.title}
                  </span>
                  {index === 0 ? (
                    <Quote className="text-gray-700 group-hover:text-[#FF4D30] transition-colors w-6 h-6" />
                  ) : null}
                </div>

                <h3
                  className={`font-serif text-white group-hover:text-gray-100 transition-colors leading-[1.1] ${
                    card.type === 'full'
                      ? 'text-3xl md:text-5xl max-w-4xl'
                      : card.type === 'large'
                        ? 'text-3xl md:text-4xl'
                        : 'text-2xl md:text-3xl'
                  }`}
                >
                  "{card.quote}"
                </h3>
              </div>

              <div className="relative z-10 mt-8 pt-8 border-t border-white/5 group-hover:border-white/10 transition-colors">
                <p className="text-gray-500 text-sm font-light leading-relaxed max-w-lg group-hover:text-gray-400">{card.sub}</p>
              </div>
            </div>
          ))}

          <div className="bento-item group md:col-span-12 p-1 relative rounded-3xl overflow-hidden mt-8 cursor-pointer invisible">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 animate-gradient-x"></div>
            <div className="relative bg-[#050505] rounded-[22px] h-full p-10 flex flex-col md:flex-row items-center justify-between gap-8 hover:bg-[#0a0a0a] transition-colors">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-[#FF4D30] flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <PhoenixIcon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-white mb-1">Lista para escalar?</h3>
                  <p className="text-gray-500 text-sm">Agenda una sesion de diagnostico estrategico.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-xs font-bold uppercase tracking-widest text-white">Iniciar Conversacion</span>
                <ArrowUpRight className="text-[#FF4D30]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
