import { CheckCircle2 } from 'lucide-react';
import { GsapParallax } from '@/components/ui/GsapParallax';
import { GsapReveal } from '@/components/ui/GsapReveal';
import { PhoenixIcon } from '@/components/icons/PhoenixIcon';
import { manifiestoChecklist } from '@/data/site-content';

interface ManifiestoSectionProps {
  gsapReady: boolean;
}

export function ManifiestoSection({ gsapReady }: ManifiestoSectionProps) {
  return (
    <section id="manifiesto" className="relative z-10 overflow-hidden bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[600px] lg:h-auto bg-[#1a1a1a] overflow-hidden group flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 overflow-hidden">
            <GsapParallax gsapReady={gsapReady} speed={1.5} className="w-full h-[130%] -mt-[15%]">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="none" stroke="#FF4D30" strokeWidth="0.5" />
                <path
                  d="M0 100 C 30 20 60 20 100 100 Z"
                  fill="none"
                  stroke="#FF4D30"
                  strokeWidth="0.5"
                  className="opacity-50"
                />
              </svg>
            </GsapParallax>
          </div>

          <div className="relative z-20 max-w-md px-12">
            <GsapReveal gsapReady={gsapReady} direction="right">
              <div className="w-16 h-16 text-[#FF4D30] mb-8 opacity-80">
                <PhoenixIcon className="w-full h-full" />
              </div>
              <blockquote className="text-3xl md:text-4xl font-serif text-white leading-tight">
                "No construimos empresas para sobrevivir. Construimos para trascender a la quiebra y al tiempo."
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-[1px] w-12 bg-[#FF4D30]"></div>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">La Fundadora</span>
              </div>
            </GsapReveal>
          </div>
        </div>

        <div className="py-24 px-8 lg:px-24 flex flex-col justify-center bg-white border-b border-gray-100 lg:border-none">
          <GsapReveal gsapReady={gsapReady} direction="up" delay={0.1}>
            <span className="text-[#FF4D30] font-bold tracking-widest text-xs uppercase block mb-6">Manifiesto 2026</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-12 text-gray-900 leading-none">
              Resiliencia <br />
              <span className="text-gray-400 italic font-light decoration-[#FF4D30] underline decoration-1 underline-offset-8">
                Operativa
              </span>
              .
            </h2>
          </GsapReveal>

          <div className="space-y-8 text-gray-500 font-light text-lg leading-relaxed md:pr-12">
            <GsapReveal gsapReady={gsapReady} direction="up" delay={0.2}>
              <p>
                El 2024 cerro con exito. El 2025 trajo el silencio. En el mundo corporativo, la fragilidad es el costo
                oculto del crecimiento rapido.{' '}
                <strong className="text-gray-900 font-normal">La verdadera autoridad nace de la reconstruccion.</strong>
              </p>
            </GsapReveal>
            <GsapReveal gsapReady={gsapReady} direction="up" delay={0.3}>
              <p>
                A los 45 anos, con la complejidad de la maternidad y el matrimonio, redisenie no solo mi modelo de
                negocio, sino mi modelo de vida.{' '}
                <span className="bg-[#fff5f2] px-1 text-gray-900">No es magia, es ingenieria financiera y emocional.</span>
              </p>
            </GsapReveal>
            <GsapReveal gsapReady={gsapReady} direction="up" delay={0.4}>
              <ul className="mt-8 space-y-4">
                {manifiestoChecklist.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium text-gray-900 uppercase tracking-wider">
                    <CheckCircle2 size={16} className="text-[#FF4D30]" /> {item}
                  </li>
                ))}
              </ul>
            </GsapReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
