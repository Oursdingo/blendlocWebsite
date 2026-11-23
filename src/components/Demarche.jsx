// Notre démarche : une grande photo d'un côté ; le titre, l'introduction,
// les trois étapes de la signature et un lien de l'autre. Seule suite numérotée du site.
import React from 'react';
import { Link } from '../lib/router.jsx';
import { DEMARCHE } from '../data/accueil.js';

export function Demarche({ image, alt, focus, link = true }) {
  return (
    <section className="demarche" aria-labelledby="demarche-titre">
      <div className="demarche-media">
        <img src={image} alt={alt} loading="lazy" style={focus ? { objectPosition: focus } : undefined} />
      </div>
      <div className="demarche-body">
        <div className="demarche-inner">
          <h2 id="demarche-titre" className="h2">{DEMARCHE.title}</h2>
          <p className="lead">{DEMARCHE.intro}</p>
          <ol className="steps">
            {DEMARCHE.steps.map((step, i) => (
              <li key={step.title} className="step">
                <span className="step-num" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3 className="step-title">{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          {link && <Link to="/a-propos" className="link">En savoir plus sur Blendbloc</Link>}
        </div>
      </div>
    </section>
  );
}
