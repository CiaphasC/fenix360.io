import { ArrowUpRight } from 'lucide-react';
import { HeroParticles } from '@/components/three/HeroParticles';
import { scrollToSection } from '@/utils/scrollToSection';

export function HeroSection() {
  const scrollToConsultoria = () => {
    scrollToSection('consultoria');
  };

  const scrollToManifiesto = () => {
    scrollToSection('manifiesto');
  };

  return (
    <section className="relative h-screen min-h-[600px] w-full flex items-center overflow-hidden">
      <HeroParticles />

      <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-8 relative z-10 mt-16 md:mt-0">
            <div className="flex flex-col justify-center items-start">
              <div className="hero-line flex items-center gap-3 mb-8 md:mb-10 origin-left opacity-0">
                <div className="w-12 h-[1px] bg-[#FF4D30]"></div>
                <div className="text-[#FF4D30] text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase">
                  Consultoria & Mentoria
                </div>
              </div>

              <div className="relative hero-title">
                <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-serif leading-[0.95] md:leading-[0.9] text-gray-900 mb-8 md:mb-10 tracking-tight">
                  <div className="overflow-hidden block pb-2">
                    <span className="hero-title-line block opacity-0">El arte de</span>
                  </div>
                  <div className="overflow-hidden block pb-2">
                    <span className="hero-title-line block opacity-0">
                      <span className="relative">
                        <span className="text-gray-400 italic font-light pr-3 md:pr-4">renacer</span>
                        con
                      </span>
                    </span>
                  </div>
                  <div className="overflow-hidden block pb-2">
                    <span className="hero-title-line block opacity-0">autoridad.</span>
                  </div>
                </h1>
              </div>

              <div className="max-w-xl pl-0 md:pl-2 hero-desc opacity-0">
                <p className="text-base md:text-xl text-gray-500 font-light leading-relaxed mb-10 md:mb-12">
                  Transformamos crisis empresariales en legados solidos. Metodologia exclusiva para empresarias que
                  integran facturacion de alto nivel con una vida personal plena.
                </p>
              </div>

              <div className="hero-btn mt-4 md:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 opacity-0 w-full">
                <button
                  type="button"
                  onClick={scrollToConsultoria}
                  className="group relative px-6 md:px-8 py-4 bg-gray-900 text-white overflow-hidden transition-all hover:bg-[#FF4D30] w-full sm:w-auto flex justify-start sm:justify-center"
                >
                  <div className="relative z-10 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em]">
                    Ver Caso de Estudio
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={scrollToManifiesto}
                  className="group flex items-center justify-start sm:justify-center gap-3 px-6 md:px-8 py-4 text-gray-500 hover:text-gray-900 transition-colors w-fit sm:w-auto"
                >
                  <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#FF4D30] transition-colors shrink-0">
                    <div className="w-0 h-0 border-l-[6px] border-l-gray-900 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5 group-hover:border-l-[#FF4D30]"></div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em]">Ver Manifiesto</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
