// =============================================
// Réalisations : la grille des projets, filtrée par domaine (?domaine=…).
// =============================================
import React from 'react';
import { Link, useNavigate, useQueryParam, usePageTitle } from '../lib/router.jsx';
import { PageBanner } from '../components/PageBanner.jsx';
import { ProjetCard } from '../components/ProjetCard.jsx';
import { PROJETS } from '../data/projets.js';
import { DOMAINES, DOMAINES_BY_ID } from '../data/domaines.js';

const ALL = { id: 'tous', name: 'Tous les domaines' };

export default function Realisations() {
  usePageTitle('Réalisations');
  const navigate = useNavigate();
  const param = useQueryParam('domaine');
  const current = DOMAINES_BY_ID[param] ? param : ALL.id;
  const domaine = DOMAINES_BY_ID[current];
  const items = current === ALL.id ? PROJETS : PROJETS.filter((p) => p.domaine === current);

  const select = (id) => {
    navigate(id === ALL.id ? '/realisations' : `/realisations?domaine=${id}`, { replace: true });
  };

  return (
    <>
      <PageBanner title="Nos réalisations" image="/assets/photos/marketing.jpeg" focus="50% 40%">
        Tournois, activations, cérémonies et campagnes menés sur le terrain et en ligne.
      </PageBanner>

      <div data-intro-rest>
        <section className="section">
          <div className="container">
            <div className="filters" role="group" aria-label="Filtrer par domaine">
              {[ALL, ...DOMAINES].map((d) => {
                const total = d.id === ALL.id ? PROJETS.length : PROJETS.filter((p) => p.domaine === d.id).length;
                const on = current === d.id;
                return (
                  <button key={d.id} type="button" className={`filter${on ? ' is-active' : ''}`} aria-pressed={on} onClick={() => select(d.id)}>
                    {d.name}
                    <span className="filter-count">{total}</span>
                  </button>
                );
              })}
            </div>

            {domaine && <p className="filter-intro">{domaine.text}</p>}

            {items.length > 0 ? (
              <ul className="projets-list">
                {items.map((p) => <li key={p.slug}><ProjetCard projet={p} as="h2" /></li>)}
              </ul>
            ) : (
              <div className="empty">
                <p className="lead">Aucune réalisation n'est encore publiée pour ce domaine.</p>
                <Link to="/contact?besoin=devis" className="link">Parlons de votre projet</Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
