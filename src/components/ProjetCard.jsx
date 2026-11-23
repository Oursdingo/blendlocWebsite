// Carte projet : photo, logo (ou initiale) du client à cheval sur la photo,
// nom, métier, une phrase et « Voir le projet ». Toute la carte est cliquable.
import React from 'react';
import { Link } from '../lib/router.jsx';
import { SERVICES_BY_ID } from '../data/services.js';

export function ProjetCard({ projet, size = 'md', as: Heading = 'h3' }) {
  const service = SERVICES_BY_ID[projet.service];
  return (
    <article className={`projet projet--${size}`}>
      <div className="projet-media">
        <div className="projet-img">
          <img src={projet.image} alt={projet.alt} loading="lazy" style={projet.focus ? { objectPosition: projet.focus } : undefined} />
        </div>
        {projet.logo ? (
          <span className="projet-badge projet-badge--logo" aria-hidden="true"><img src={projet.logo} alt="" /></span>
        ) : (
          <span className="projet-badge" style={{ background: projet.badge.color }} aria-hidden="true">{projet.badge.initial}</span>
        )}
      </div>
      <Heading className="projet-title">
        <Link to={`/realisations/${projet.slug}`} className="stretched">{projet.title}</Link>
      </Heading>
      <p className="projet-meta">{service?.name}</p>
      <p className="projet-text">{projet.summary}</p>
      <span className="projet-more" aria-hidden="true">Voir le projet</span>
    </article>
  );
}
