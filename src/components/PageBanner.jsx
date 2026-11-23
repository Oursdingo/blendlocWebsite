// Bandeau de titre des pages intérieures : photo voilée, titre et fil d'Ariane.
import React from 'react';
import { Link } from '../lib/router.jsx';

export function PageBanner({ title, image, focus, crumbs = [], children }) {
  return (
    <section className="banner">
      <div className="banner-media" data-hero-fade aria-hidden="true">
        <img src={image} alt="" style={focus ? { objectPosition: focus } : undefined} fetchpriority="high" />
      </div>
      <div className="container banner-in">
        <div className="banner-content" data-hero-item>
          <h1 className="banner-title">{title}</h1>
          {children && <p className="banner-lead">{children}</p>}
          <nav className="crumbs" aria-label="Fil d'Ariane">
            <ol>
              <li><Link to="/">Accueil</Link></li>
              {crumbs.map((c) => <li key={c.to}><Link to={c.to}>{c.label}</Link></li>)}
              <li aria-current="page">{title}</li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
