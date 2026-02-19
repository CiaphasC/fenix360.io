export type RevealDirection = 'up' | 'down' | 'left' | 'right';

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  desc: string;
}

export interface MentoriaCard {
  type: 'large' | 'tall' | 'medium' | 'large-reverse' | 'full';
  title: string;
  quote: string;
  sub: string;
  span: string;
}

export interface FooterLinkGroup {
  title: string;
  links: Array<{ label: string; href: string }>;
}
