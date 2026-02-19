import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight } from 'lucide-react';
import type { NavItem } from '@/types/content';

interface MobileMenuOverlayProps {
  isOpen: boolean;
  items: ReadonlyArray<NavItem>;
  onClose: () => void;
}

export function MobileMenuOverlay({ isOpen, items, onClose }: MobileMenuOverlayProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onEscape);
    return () => {
      window.removeEventListener('keydown', onEscape);
    };
  }, [isOpen, onClose]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      id="mobile-navigation"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-40 md:hidden bg-white pt-32 px-6 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isOpen
          ? 'translate-y-0 opacity-100 visible pointer-events-auto'
          : '-translate-y-full opacity-0 invisible pointer-events-none'
      }`}
    >
      <div className="flex flex-col gap-8 text-2xl font-serif">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="border-b border-gray-100 pb-4 flex justify-between items-center group"
          >
            {item.label}
            <ArrowUpRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#FF4D30]" />
          </a>
        ))}
        <button className="mt-8 bg-gray-900 text-white py-4 text-xs font-bold uppercase tracking-widest w-full">
          Agenda Privada
        </button>
      </div>
    </div>,
    document.body,
  );
}
