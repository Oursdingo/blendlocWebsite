// =============================================
// À propos : présentation, démarche, équipe, ce qui fait la différence.
// =============================================
import React from 'react';
import { Link, usePageTitle } from '../lib/router.jsx';
import { PageBanner } from '../components/PageBanner.jsx';
import { Demarche } from '../components/Demarche.jsx';
import { DIFFERENCES } from '../data/accueil.js';

export default function APropos() {
  usePageTitle('À propos');
  return (
    <>
      <PageBanner title="À propos" image="/assets/photos/evenementiel.jpeg" focus="50% 55%">
        Une agence marketing et événementielle née sur le terrain, à Ouagadougou.
      </PageBanner>

      <div data-intro-rest>
        <section className="section" aria-labelledby="presentation-titre">
          <div className="container split">
            <div className="split-body">
              <h2 id="presentation-titre" className="h2">Une agence née sur le terrain</h2>
              <p className="lead">
                Blendbloc est une agence marketing et événementielle. Nous relions le digital et
                l'expérience réelle pour transformer les audiences en communautés actives et en
                résultats mesurables.
              </p>
              <p>
                Nous accompagnons les entreprises, les institutions et les organisations qui veulent
                attirer, engager et convertir leurs publics, à Ouagadougou et dans plusieurs villes du
                Burkina Faso.
              </p>
            </div>
            <div className="split-media">
              <img src="/assets/photos/landing_photo.jpeg" alt="Remise du trophée de la Dream League, organisée par Blendbloc" loading="lazy" />
            </div>
          </div>
        </section>

        <Demarche image="/assets/photos/digital.jpeg" alt="L'équipe sur le terrain pendant la campagne « Never Give Up »" focus="55% 35%" link={false} />

        <section className="section" aria-labelledby="equipe-titre">
          <div className="container split is-reversed">
            <div className="split-body">
              <h2 id="equipe-titre" className="h2">L'équipe</h2>
              <p className="lead">Quatre pôles, une seule équipe.</p>
              <p>
                Marketing, digital, événementiel et branding travaillent côte à côte sur chaque
                projet. Chaque pôle peut être mobilisé seul ou combiné, et vous gardez un seul
                interlocuteur, de la stratégie au terrain.
              </p>
              <Link to="/contact" className="link">Rencontrer l'équipe</Link>
            </div>
            <div className="split-media split-media--tall">
              <img src="/assets/photos/aboutUs.jpeg" alt="L'équipe Blendbloc" loading="lazy" style={{ objectPosition: '50% 25%' }} />
            </div>
          </div>
        </section>

        <section className="section alt" aria-labelledby="difference-titre">
          <div className="container">
            <h2 id="difference-titre" className="h2">Ce qui fait la différence</h2>
            <ul className="diffs">
              {DIFFERENCES.map((d) => (
                <li key={d.title} className="diff">
                  <span className="diff-rule" aria-hidden="true" />
                  <h3 className="diff-title">{d.title}</h3>
                  <p>{d.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
