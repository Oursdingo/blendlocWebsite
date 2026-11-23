// =============================================
// Fiche projet : bandeau, description, en bref, photo, autres réalisations.
// =============================================
import React from 'react';
import { Link, usePageTitle } from '../lib/router.jsx';
import { PageBanner } from '../components/PageBanner.jsx';
import { ProjetCard } from '../components/ProjetCard.jsx';
import { PROJETS, findProjet } from '../data/projets.js';
import { SERVICES_BY_ID } from '../data/services.js';
import { DOMAINES_BY_ID } from '../data/domaines.js';
import NotFound from './NotFound.jsx';

export default function Projet({ slug }) {
  const projet = findProjet(slug);
  usePageTitle(projet ? projet.title : 'Page introuvable');
  if (!projet) return <NotFound />;

  const service = SERVICES_BY_ID[projet.service];
  const domaine = DOMAINES_BY_ID[projet.domaine];
  // D'abord les projets du même pôle, puis les autres.
  const autres = [
    ...PROJETS.filter((p) => p.slug !== slug && p.service === projet.service),
    ...PROJETS.filter((p) => p.slug !== slug && p.service !== projet.service),
  ].slice(0, 3);

  return (
    <>
      <PageBanner title={projet.title} image={projet.image} focus={projet.focus} crumbs={[{ to: '/realisations', label: 'Réalisations' }]} />

      <div data-intro-rest>
        <section className="section">
          <div className="container projet-detail">
            <div className="projet-detail-main">
              <h2 className="h2">Le projet</h2>
              <p className="lead">{projet.summary}</p>
              <h3 className="h-small">Ce que nous avons fait</h3>
              <ul className="ticks ticks--single">
                {projet.tasks.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
            <aside className="projet-facts" aria-label="En bref">
              <dl>
                {projet.client && (<><dt>Client</dt><dd>{projet.client}</dd></>)}
                <dt>Service</dt>
                <dd><Link to={`/services#${service.id}`}>{service.name}</Link></dd>
                <dt>Domaine</dt>
                <dd><Link to={`/realisations?domaine=${domaine.id}`}>{domaine.name}</Link></dd>
                <dt>Lieu</dt>
                <dd>{projet.place}</dd>
                <dt>Année</dt>
                <dd>{projet.year}</dd>
              </dl>
              <Link to={`/contact?besoin=${service.id}`} className="btn btn-gold">Un projet similaire ? Parlons-en</Link>
            </aside>
          </div>
          <div className="container">
            <figure className="projet-figure">
              <img src={projet.image} alt={projet.alt} />
            </figure>
          </div>
        </section>

        <section className="section alt" aria-labelledby="autres-titre">
          <div className="container">
            <h2 id="autres-titre" className="h2">D'autres réalisations</h2>
            <ul className="projets-list projets-list--related">
              {autres.map((p) => <li key={p.slug}><ProjetCard projet={p} /></li>)}
            </ul>
            <Link to="/realisations" className="link link-more">Voir toutes nos réalisations</Link>
          </div>
        </section>
      </div>
    </>
  );
}
