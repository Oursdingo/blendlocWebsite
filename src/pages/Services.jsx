// =============================================
// Services : des ancres vers les quatre pôles, puis un bloc par pôle,
// texte et photo en alternance.
// =============================================
import React from 'react';
import { Link, usePageTitle } from '../lib/router.jsx';
import { PageBanner } from '../components/PageBanner.jsx';
import { SERVICES } from '../data/services.js';
import { PROJETS } from '../data/projets.js';

export default function Services() {
  usePageTitle('Services');
  return (
    <>
      <PageBanner title="Nos services" image="/assets/photos/landing_photo.jpeg" focus="50% 30%">
        Quatre pôles, une seule équipe, de la stratégie au terrain.
      </PageBanner>

      <div data-intro-rest>
        <section className="services-intro">
          <div className="container services-intro-in">
            <p className="lead">
              Chaque pôle peut être mobilisé seul ou combiné aux autres. Vous gardez un seul
              interlocuteur, de la première réunion au bilan.
            </p>
            <nav className="anchors" aria-label="Les quatre pôles">
              <ul>
                {SERVICES.map((s) => (
                  <li key={s.id}><Link to={`/services#${s.id}`}>{s.name}</Link></li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {SERVICES.map((s, i) => {
          const exemples = PROJETS.filter((p) => p.service === s.id).slice(0, 3);
          return (
            <section key={s.id} id={s.id} className={`service-block${i % 2 ? ' alt' : ''}`} aria-labelledby={`${s.id}-titre`}>
              <div className={`container service-in${i % 2 ? ' is-reversed' : ''}`}>
                <div className="service-media">
                  <img src={s.image} alt={s.alt} loading="lazy" />
                </div>
                <div className="service-body">
                  <h2 id={`${s.id}-titre`} className="h2">{s.name}</h2>
                  <p className="lead">{s.intro}</p>
                  <p className="service-text">{s.text}</p>
                  <h3 className="h-small">Ce que nous faisons</h3>
                  <ul className="ticks">
                    {s.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  {exemples.length > 0 && (
                    <p className="service-examples">
                      <span>Exemples : </span>
                      {exemples.map((p, j) => (
                        <React.Fragment key={p.slug}>
                          {j > 0 && ', '}
                          <Link to={`/realisations/${p.slug}`}>{p.title}</Link>
                        </React.Fragment>
                      ))}
                    </p>
                  )}
                  <Link to={`/contact?besoin=${s.id}`} className="btn btn-gold">Demander un devis</Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
