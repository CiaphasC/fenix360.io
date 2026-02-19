import { footerLinkGroups } from '@/data/site-content';
import { PhoenixIcon } from '@/components/icons/PhoenixIcon';
import { GsapReveal } from '@/components/ui/GsapReveal';

interface FooterProps {
  gsapReady: boolean;
}

export function Footer({ gsapReady }: FooterProps) {
  return (
    <footer className="py-16 px-6 bg-[#111] text-gray-400 text-xs relative z-10">
      <GsapReveal gsapReady={gsapReady} direction="up">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-gray-800 pt-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 text-white font-serif text-2xl mb-6">
              <PhoenixIcon className="w-8 h-8 text-[#FF4D30]" />
              FENIX360
            </div>
            <p className="max-w-xs text-gray-500 leading-relaxed mb-8">
              Consultoria estrategica de alto nivel para la reconstruccion y escalado de imperios corporativos.
            </p>
            <div className="text-gray-600">&copy; 2026 FENIX360 Inc. Todos los derechos reservados.</div>
          </div>

          {footerLinkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-white uppercase tracking-widest font-bold mb-6">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-[#FF4D30] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </GsapReveal>
    </footer>
  );
}
