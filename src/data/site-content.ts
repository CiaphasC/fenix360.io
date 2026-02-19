import type { FooterLinkGroup, MentoriaCard, NavItem, Service } from '@/types/content';

export const navItems: ReadonlyArray<NavItem> = [
  { label: 'Manifiesto', href: '#manifiesto' },
  { label: 'Mentoria', href: '#mentoria' },
  { label: 'Consultoria', href: '#consultoria' },
];

export const services: ReadonlyArray<Service> = [
  {
    id: '01',
    title: 'Reestructuracion',
    desc: 'Analisis forense de quiebra y diseno de nueva arquitectura empresarial.',
  },
  {
    id: '02',
    title: 'Auditoria de Riesgo',
    desc: 'Protocolos de seguridad financiera para prevenir futuros colapsos.',
  },
  {
    id: '03',
    title: 'Alta Direccion',
    desc: 'Metodologia propietaria para integrar maternidad en roles de C-Level.',
  },
  {
    id: '04',
    title: 'Escalabilidad',
    desc: 'Sistemas de crecimiento validados para facturacion recurrente.',
  },
];

export const mentoriaCards: ReadonlyArray<MentoriaCard> = [
  {
    type: 'large',
    title: 'Liderazgo',
    quote: 'Liderar es asumir responsabilidad antes que reconocimiento.',
    sub: 'Tomar decisiones dificiles hoy para construir el futuro que quieres liderar manana.',
    span: 'md:col-span-8',
  },
  {
    type: 'tall',
    title: 'Autenticidad',
    quote: 'No viniste a conformarte. Viniste a ser tu mejor version.',
    sub: 'La autenticidad es tu mayor activo financiero.',
    span: 'md:col-span-4',
  },
  {
    type: 'medium',
    title: 'Reconstruccion',
    quote: 'Reconstruirte a ti misma en cada desafio.',
    sub: 'Eres mas fuerte de lo que imaginas y mas capaz de lo que te han dicho.',
    span: 'md:col-span-4',
  },
  {
    type: 'large-reverse',
    title: 'Maestria',
    quote: 'Domina tu producto para guiar con verdad.',
    sub: 'Cuando entiendes lo que vendes, conectas con ejemplos reales que hacen clic.',
    span: 'md:col-span-8',
  },
  {
    type: 'full',
    title: 'Construccion',
    quote: 'Los vendedores no nacen, se construyen.',
    sub: 'Vender no es cerrar, es abrir puertas de posibilidades ilimitadas.',
    span: 'md:col-span-12',
  },
];

export const manifiestoChecklist: ReadonlyArray<string> = [
  'Recuperacion de activos en tiempo record',
  'Blindaje legal y financiero',
  'Conciliacion real C-Level',
];

export const footerLinkGroups: ReadonlyArray<FooterLinkGroup> = [
  {
    title: 'Explorar',
    links: [
      { label: 'Manifiesto', href: '#manifiesto' },
      { label: 'Casos de Estudio', href: '#' },
      { label: 'Consultoria', href: '#consultoria' },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'LinkedIn', href: '#' },
      { label: 'Instagram', href: '#' },
      { label: 'Twitter / X', href: '#' },
    ],
  },
];
