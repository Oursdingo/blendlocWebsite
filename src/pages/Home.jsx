// =============================================
// Accueil : carrousel plein écran, bandeau des métiers à cheval sur le carrousel,
// démarche, chiffres, domaines, réalisations.
// =============================================
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, usePageTitle } from '../lib/router.jsx';
import { SLIDES, CHIFFRES } from '../data/accueil.js';
import { SERVICES } from '../data/services.js';
import { DOMAINES } from '../data/domaines.js';
import { PROJETS } from '../data/projets.js';
import { Demarche } from '../components/Demarche.jsx';
import { ProjetCard } from '../components/ProjetCard.jsx';

const SLIDE_DELAY_MS = 7000;
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const introPlaying = () => document.documentElement.getAttribute('data-intro') === 'play';

// Le carrousel attend la fin de l'intro avant de tourner.
function useIntroDone() {
  const [done, setDone] = React.useState(() => !introPlaying());
  React.useEffect(() => {
    if (done) return undefined;
    const observer = new MutationObserver(() => { if (!introPlaying()) setDone(true); });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-intro'] });
    return () => observer.disconnect();
  }, [done]);
  return done;
}

// Quatre diapositives en fondu, une toutes les 7 secondes ; arrêt au survol et au clavier.
function Carousel() {
  const [index, setIndex] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const introDone = useIntroDone();
  const count = SLIDES.length;
  const paused = hovered || focused;
  const go = React.useCallback((step) => setIndex((i) => (i + step + count) % count), [count]);

  React.useEffect(() => {
    if (!introDone || paused || reduceMotion()) return undefined;
    const timer = window.setTimeout(() => go(1), SLIDE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, introDone, go]);

  return (
    <section
      className="hero"
      aria-roledescription="carrousel"
      aria-label="Nos quatre métiers"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    >
      <h1 className="sr-only">Blendbloc, agence marketing et événementielle à Ouagadougou</h1>
      <div className="hero-slides" aria-live={paused ? 'polite' : 'off'}>
        {SLIDES.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.id}
              className={`slide${active ? ' is-active' : ''}`}
              role="group"
              aria-roledescription="diapositive"
              aria-label={`${i + 1} sur ${count}`}
              aria-hidden={active ? undefined : true}
              inert={active ? undefined : ''}
            >
              <div className="slide-media" data-hero-fade>
                <img src={slide.image} alt="" style={{ objectPosition: slide.focus }} fetchpriority={i === 0 ? 'high' : undefined} />
              </div>
              <div className="container slide-in">
                <div className="slide-content" data-hero-item>
                  <h2 className="slide-title">{slide.title}</h2>
                  <p className="slide-text">{slide.text}</p>
                  <div className="slide-actions">
                    <Link to="/contact?besoin=devis" className="btn btn-gold">Demander un devis</Link>
                    <Link to={slide.secondary.to} className="btn btn-outline-light">{slide.secondary.label}</Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="container hero-controls">
        <div className="hero-arrows" data-hero-item>
          <button type="button" onClick={() => go(-1)} aria-label="Diapositive précédente">
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Diapositive suivante">
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

// Quatre panneaux accolés, sans ombre ni arrondi, remontés sur la photo ; un filet s'allonge au survol.
function Metiers() {
  return (
    <section className="metiers" aria-labelledby="metiers-titre">
      <h2 id="metiers-titre" className="sr-only">Nos quatre pôles</h2>
      <div className="container">
        <ul className="metiers-grid" data-hero-item>
          {SERVICES.map((s) => (
            <li key={s.id} className="metier">
              <div className="metier-img">
                <img src={s.image} alt="" style={s.thumbFocus ? { objectPosition: s.thumbFocus } : undefined} />
              </div>
              <div className="metier-body">
                <h3 className="metier-title">
                  <Link to={`/services#${s.id}`} className="stretched">{s.name}</Link>
                </h3>
                <p>{s.short}</p>
                <span className="metier-rule" aria-hidden="true" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Quatre chiffres, chacun expliqué en une ligne. Ni icône, ni carte, ni compteur.
function Chiffres() {
  return (
    <section className="section chiffres" aria-labelledby="chiffres-titre">
      <div className="container">
        <h2 id="chiffres-titre" className="h2">Blendbloc en chiffres</h2>
        <ul className="chiffres-grid">
          {CHIFFRES.map((c) => (
            <li key={c.label} className="chiffre">
              <span className="chiffre-rule" aria-hidden="true" />
              <p className="chiffre-value">{c.value}</p>
              <p className="chiffre-label">{c.label}</p>
              <p className="chiffre-context">{c.context}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Là où nous intervenons : trois domaines, chacun menant à ses réalisations.
function Domaines() {
  return (
    <section className="section alt domaines" aria-labelledby="domaines-titre">
      <div className="container">
        <h2 id="domaines-titre" className="h2">Là où nous intervenons</h2>
        <ul className="domaines-grid">
          {DOMAINES.map((d) => (
            <li key={d.id} className="domaine">
              <div className="domaine-img">
                <img src={d.image} alt="" loading="lazy" style={{ objectPosition: d.focus }} />
              </div>
              <div className="domaine-body">
                <h3 className="domaine-title">{d.name}</h3>
                <p>{d.text}</p>
                <Link to={`/realisations?domaine=${d.id}`} className="link" aria-label={`Voir les réalisations : ${d.name}`}>
                  Voir les réalisations
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Un projet en grand et quatre en grille : pas de rangée de cartes identiques.
function ProjetsAccueil() {
  const [first, ...rest] = PROJETS.slice(0, 5);
  return (
    <section className="section projets-home" aria-labelledby="projets-titre">
      <div className="container">
        <h2 id="projets-titre" className="h2">Nos réalisations</h2>
        <div className="projets-layout">
          <ProjetCard projet={first} size="lg" />
          <div className="projets-grid">
            {rest.map((p) => <ProjetCard key={p.slug} projet={p} />)}
          </div>
        </div>
        <Link to="/realisations" className="link link-more">Voir toutes nos réalisations</Link>
      </div>
    </section>
  );
}

export default function Home() {
  usePageTitle(null);
  return (
    <>
      <Carousel />
      <Metiers />
      <div data-intro-rest>
        <Demarche image="/assets/photos/aboutUs.jpeg" alt="L'équipe Blendbloc" focus="50% 22%" />
        <Chiffres />
        <Domaines />
        <ProjetsAccueil />
      </div>
    </>
  );
}
