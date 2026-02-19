import { PhoenixIcon } from '@/components/icons/PhoenixIcon';

interface CurtainOverlayProps {
  isActive: boolean;
  introStep: number;
}

export function CurtainOverlay({ isActive, introStep }: CurtainOverlayProps) {
  const isFadingOut = introStep >= 4 || !isActive;
  const wipeTransform = introStep >= 3 ? 'translateY(-100%)' : 'translateY(0%)';
  const logoTransform = introStep === 0 ? 'translateY(100%)' : introStep === 1 ? 'translateY(0)' : 'translateY(-105%)';

  return (
    <div
      className={`fixed inset-0 z-[100] pointer-events-none transition-opacity duration-500 delay-1000 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        className="absolute inset-0 bg-[#FF4D30] transition-transform duration-[1.2s] ease-[cubic-bezier(0.85,0,0.15,1)]"
        style={{ transform: wipeTransform, transitionDelay: '150ms' }}
      />

      <div
        className="absolute inset-0 bg-[#050505] flex items-center justify-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.85,0,0.15,1)]"
        style={{ transform: wipeTransform }}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="overflow-hidden pb-2">
            <div
              className="text-[#FF4D30] transition-transform duration-[0.8s] ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{ transform: logoTransform }}
            >
              <PhoenixIcon className="w-16 h-16 md:w-24 md:h-24" />
            </div>
          </div>

          <div className="overflow-hidden pb-2 pt-2">
            <div
              className="text-4xl md:text-5xl font-serif text-white tracking-[0.2em] font-light transition-transform duration-[0.8s] ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                transform: logoTransform,
                transitionDelay: introStep === 1 ? '100ms' : '50ms',
              }}
            >
              FENIX<span className="font-bold text-[#FF4D30]">360</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
