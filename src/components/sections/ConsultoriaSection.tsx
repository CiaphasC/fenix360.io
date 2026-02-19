import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { GsapReveal } from '@/components/ui/GsapReveal';
import { services } from '@/data/site-content';

interface ConsultoriaSectionProps {
  gsapReady: boolean;
}

export function ConsultoriaSection({ gsapReady }: ConsultoriaSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!gsapReady || !containerRef.current) {
      return;
    }

    const context = gsap.context(() => {
      if (!containerRef.current) {
        return;
      }

      const cards = containerRef.current.querySelectorAll('.service-card');

      gsap.fromTo(
        cards,
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
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
    <section id="consultoria" className="py-32 px-6 bg-gray-50/50 relative z-10">
      <div className="max-w-[1400px] mx-auto">
        <GsapReveal gsapReady={gsapReady} direction="up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 border-b border-gray-200 pb-8">
            <div>
              <span className="text-[#FF4D30] font-bold tracking-widest text-xs uppercase block mb-4">Servicios</span>
              <h2 className="text-4xl md:text-6xl font-serif text-gray-900">Soluciones Ejecutivas</h2>
            </div>
            <a
              href="#"
              className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-[#FF4D30] transition-colors font-bold mt-8 md:mt-0"
            >
              Explorar todo <ChevronRight size={14} />
            </a>
          </div>
        </GsapReveal>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
          {services.map((service) => (
            <div key={service.id} className="h-full service-card invisible">
              <div className="group relative p-10 bg-white hover:bg-[#fff5f2] transition-colors duration-500 h-full flex flex-col justify-between cursor-pointer">
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#FF4D30] transition-all duration-500 group-hover:w-full"></div>

                <div>
                  <div className="flex justify-between items-start mb-12">
                    <span className="text-xs font-mono text-gray-300 group-hover:text-[#FF4D30] transition-colors">
                      /{service.id}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#FF4D30] group-hover:text-white transition-all duration-300">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif text-gray-900 mb-6 group-hover:translate-x-2 transition-transform duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed group-hover:text-gray-600">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
