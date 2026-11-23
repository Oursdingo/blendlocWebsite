// =============================================
// Barre noire (contacts, réseaux) et barre blanche (logo, menu, devis).
// Au défilement, la barre noire s'en va et la barre blanche reste collée en haut.
// Sous 1100 px, un bouton « Menu » ouvre le menu en plein écran.
// =============================================
import React from 'react';
import { Mail, Phone, MapPin, ChevronDown, Menu, X } from 'lucide-react';
import { Link, useLocation } from '../lib/router.jsx';
import { lockScroll } from '../lib/scrollLock.js';
import { BrandLogo } from './Logo.jsx';
import { SocialIcon } from './SocialIcon.jsx';
import { CONTACT } from '../data/contact.js';
import { NAV, isActive } from '../data/navigation.js';

const DESKTOP = '(min-width: 1100px)';

export function Header() {
  const { path } = useLocation();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [subOpen, setSubOpen] = React.useState(false);
  const headerRef = React.useRef(null);
  const subRef = React.useRef(null);

  // Toute navigation referme les menus.
  React.useEffect(() => {
    setMenuOpen(false);
    setSubOpen(false);
  }, [path]);

  // Menu mobile ouvert : la page derrière ne défile plus et ne reçoit plus le focus.
  React.useEffect(() => {
    lockScroll('menu', menuOpen);
    document.querySelectorAll('[data-menu-inert]').forEach((node) => { node.inert = menuOpen; });
  }, [menuOpen]);

  React.useEffect(() => {
    const onKey = (event) => {
      if (event.key !== 'Escape') return;
      setSubOpen(false);
      setMenuOpen(false);
    };
    const onPointer = (event) => {
      if (subRef.current && !subRef.current.contains(event.target)) setSubOpen(false);
    };
    const desktop = window.matchMedia(DESKTOP);
    const onResize = () => { if (desktop.matches) setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    desktop.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      desktop.removeEventListener('change', onResize);
    };
  }, []);

  const toggleMenu = () => {
    if (!menuOpen && headerRef.current) {
      const bottom = Math.max(0, headerRef.current.getBoundingClientRect().bottom);
      document.documentElement.style.setProperty('--menu-top', `${bottom}px`);
    }
    setMenuOpen((open) => !open);
  };

  // Un lien du menu vers la page déjà affichée (ancre) doit aussi refermer le menu.
  const closeOnLink = (event) => {
    if (event.target.closest('a')) {
      setMenuOpen(false);
      setSubOpen(false);
    }
  };

  const [phone] = CONTACT.phones;

  return (
    <>
      <div className="topbar" data-site data-nav-item data-menu-inert>
        <div className="container topbar-in">
          <ul className="topbar-list">
            <li>
              <a href={`mailto:${CONTACT.email}`} aria-label={`Nous écrire : ${CONTACT.email}`}>
                <Mail size={14} aria-hidden="true" />
                <span className="topbar-email">{CONTACT.email}</span>
              </a>
            </li>
            <li>
              <a href={phone.href}>
                <Phone size={14} aria-hidden="true" />
                <span>{phone.label}</span>
              </a>
            </li>
            <li className="topbar-city">
              <MapPin size={14} aria-hidden="true" />
              <span>{CONTACT.city}</span>
            </li>
          </ul>
          {CONTACT.socials.length > 0 && (
            <ul className="topbar-social">
              {CONTACT.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    <SocialIcon network={s.network} size={15} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <header className="header" ref={headerRef} data-site>
        <div className="container header-in">
          <Link to="/" className="brand" aria-label="Blendbloc, retour à l'accueil" data-logo-slot>
            <BrandLogo intro />
          </Link>

          <nav className="nav" aria-label="Navigation principale" data-nav-item>
            <ul className="nav-list" onClick={closeOnLink}>
              {NAV.map((item) => {
                const active = isActive(path, item.to);
                const link = (
                  <Link to={item.to} className={`nav-link${active ? ' is-active' : ''}`} aria-current={active ? 'page' : undefined}>
                    {item.label}
                  </Link>
                );
                if (!item.children) return <li key={item.to} className="nav-item">{link}</li>;
                return (
                  <li
                    key={item.to}
                    ref={subRef}
                    className={`nav-item has-sub${subOpen ? ' is-open' : ''}`}
                    onMouseEnter={() => setSubOpen(true)}
                    onMouseLeave={() => setSubOpen(false)}
                    onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setSubOpen(false); }}
                  >
                    {link}
                    <button
                      type="button"
                      className="sub-toggle"
                      aria-expanded={subOpen}
                      aria-controls="sous-menu-services"
                      aria-label="Afficher les quatre pôles"
                      onClick={() => setSubOpen((open) => !open)}
                    >
                      <ChevronDown size={16} aria-hidden="true" />
                    </button>
                    <ul className="sub" id="sous-menu-services">
                      {item.children.map((child) => (
                        <li key={child.to}><Link to={child.to}>{child.label}</Link></li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link to="/contact?besoin=devis" className="btn btn-gold header-cta" data-nav-item>Demander un devis</Link>

          <button
            type="button"
            className="menu-toggle"
            data-nav-item
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            onClick={toggleMenu}
          >
            <span>{menuOpen ? 'Fermer' : 'Menu'}</span>
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div id="menu-mobile" className={`mobile-menu${menuOpen ? ' is-open' : ''}`} onClick={closeOnLink}>
        <nav aria-label="Menu">
          <ul className="mm-list">
            {NAV.map((item) => {
              const active = isActive(path, item.to);
              return (
                <li key={item.to}>
                  <Link to={item.to} className={`mm-link${active ? ' is-active' : ''}`} aria-current={active ? 'page' : undefined}>
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mm-sub">
                      {item.children.map((child) => (
                        <li key={child.to}><Link to={child.to}>{child.label}</Link></li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
          <Link to="/contact?besoin=devis" className="btn btn-gold mm-cta">Demander un devis</Link>
          <ul className="mm-contacts">
            <li><a href={`mailto:${CONTACT.email}`}><Mail size={16} aria-hidden="true" />{CONTACT.email}</a></li>
            {CONTACT.phones.map((p) => (
              <li key={p.href}><a href={p.href}><Phone size={16} aria-hidden="true" />{p.label}</a></li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
