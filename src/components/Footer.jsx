// =============================================
// Pied de page : fond noir, bande de contacts, quatre colonnes,
// logo de Blendbloc au trait en filigrane.
// =============================================
import React from 'react';
import { Link, useLocation } from '../lib/router.jsx';
import { BrandLogo, LogoOutline } from './Logo.jsx';
import { ContactBand } from './ContactBand.jsx';
import { SocialIcon } from './SocialIcon.jsx';
import { CONTACT } from '../data/contact.js';
import { NAV } from '../data/navigation.js';
import { SERVICES } from '../data/services.js';

export function Footer() {
  const { path } = useLocation();
  const year = new Date().getFullYear();
  // La page Contact affiche déjà ses coordonnées juste au-dessus : pas de doublon.
  const showBand = path !== '/contact';

  return (
    <footer className={`footer${showBand ? '' : ' footer--no-band'}`} data-site data-menu-inert>
      <LogoOutline className="footer-watermark" />
      <div className="container footer-in">
        {showBand && <ContactBand tone="dark" />}

        <div className="footer-cols">
          <div className="footer-about">
            <Link to="/" className="footer-logo" aria-label="Blendbloc, retour à l'accueil">
              <BrandLogo tone="light" />
            </Link>
            <p>
              Agence marketing et événementielle à Ouagadougou. Nous aidons les marques et les
              institutions à attirer, engager et convertir leurs publics.
            </p>
          </div>

          <nav aria-labelledby="footer-pages">
            <h2 id="footer-pages" className="footer-title">Pages</h2>
            <ul className="footer-links">
              {NAV.map((item) => <li key={item.to}><Link to={item.to}>{item.label}</Link></li>)}
            </ul>
          </nav>

          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className="footer-title">Services</h2>
            <ul className="footer-links">
              {SERVICES.map((s) => <li key={s.id}><Link to={`/services#${s.id}`}>{s.name}</Link></li>)}
            </ul>
          </nav>

          <div className="footer-join">
            <h2 className="footer-title">Nous joindre</h2>
            <p>Un événement, une campagne ou un site à lancer ? Décrivez votre projet, nous vous répondons sous 24 h.</p>
            <Link to="/contact?besoin=devis" className="btn btn-gold">Demander un devis</Link>
            {CONTACT.socials.length > 0 && (
              <ul className="footer-social">
                {CONTACT.socials.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      <SocialIcon network={s.network} size={15} />
                      <span>{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} Blendbloc. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
