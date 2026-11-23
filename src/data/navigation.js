// Menu principal : le même sur toutes les pages (en-tête, menu mobile, pied de page).
import { SERVICES } from './services.js';

export const NAV = [
  { to: '/', label: 'Accueil' },
  {
    to: '/services',
    label: 'Services',
    children: SERVICES.map((s) => ({ to: `/services#${s.id}`, label: s.name })),
  },
  { to: '/realisations', label: 'Réalisations' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

export const isActive = (path, to) => (to === '/' ? path === '/' : path === to || path.startsWith(`${to}/`));
