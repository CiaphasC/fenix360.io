import { Menu, X } from 'lucide-react';
import { navItems } from '@/data/site-content';
import { PhoenixIcon } from '@/components/icons/PhoenixIcon';
import { MobileMenuOverlay } from '@/components/layout/MobileMenuOverlay';

interface HeaderProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  isScrolled: boolean;
}

export function Header({ isMenuOpen, onToggleMenu, onCloseMenu, isScrolled }: HeaderProps) {
  return (
    <>
      <nav
        className={`header-shell fixed top-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-gray-100/50 py-3 shadow-[0_2px_20px_rgba(0,0,0,0.02)]'
            : 'bg-transparent border-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-full flex justify-between items-center">
          <div
            className={`nav-item flex items-center gap-3 font-serif tracking-tight text-gray-900 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left ${
              isScrolled ? 'scale-90' : 'scale-100'
            }`}
          >
            <div
              className={`text-[#FF4D30] transition-all duration-700 drop-shadow-sm ${
                isScrolled ? 'w-8 h-8' : 'w-10 h-10 md:w-12 md:h-12'
              }`}
            >
              <PhoenixIcon className="w-full h-full" />
            </div>
            <div className={`${isScrolled ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold flex items-center tracking-tighter`}>
              FENIX<span className="text-[#FF4D30] font-light ml-1">360</span>
            </div>
          </div>

          <div className="hidden md:flex gap-12 text-[11px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-item relative hover:text-gray-900 transition-colors duration-300 after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-[#FF4D30] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button
              className={`nav-item hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-4 transition-all duration-500 ease-out border ${
                isScrolled
                  ? 'bg-gray-900 text-white border-gray-900 hover:bg-[#FF4D30] hover:border-[#FF4D30]'
                  : 'bg-transparent text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white'
              }`}
            >
              Agenda Privada
            </button>
            <button
              className="md:hidden relative z-50 text-gray-900 p-2 hover:bg-gray-50 rounded-full transition-colors"
              onClick={onToggleMenu}
              aria-label={isMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <MobileMenuOverlay isOpen={isMenuOpen} items={navItems} onClose={onCloseMenu} />
    </>
  );
}
