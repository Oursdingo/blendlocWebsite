// =============================================
// BlendBloc — Sections (Hero, About, Approche, Services...)
// =============================================
import React from 'react';
import { Sun, Moon } from 'lucide-react';

export const useReveal = () => {
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
};

// ---------------- NAV ----------------
export const Nav = ({ theme, onToggleTheme, onContactClick }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState('accueil');
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['accueil', 'a-propos', 'services', 'contact'];
      const y = window.scrollY + window.innerHeight / 3;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          setActive(id); break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'a-propos', label: 'À propos' },
    { id: 'services', label: 'Services' },
  ];

  const close = () => setMobileOpen(false);

  return (
    <React.Fragment>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#accueil" className="nav-brand" onClick={close}>
          <img src="/assets/photos/logoBlendbloc.png" alt="BlendBloc" className="nav-logo-lg" />
          <span>Blendbloc<span className="nav-brand-mark"></span></span>
        </a>
        <div className="nav-links">
          {links.map(l => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? 'active' : ''}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button className={`theme-toggle ${theme}`} onClick={onToggleTheme} aria-label="Thème">
            <span className="theme-icon-wrapper">
              <Sun className="icon-sun" size={18} />
              <Moon className="icon-moon" size={18} />
            </span>
          </button>
          <a href="#contact" className="btn btn-primary btn-arrow">Nous contacter</a>
          <button
            className={`mobile-toggle ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Menu"
          >
            <span></span><span></span>
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {links.map(l => (
          <a key={l.id} href={`#${l.id}`} onClick={close}>{l.label}</a>
        ))}
        <a href="#contact" onClick={close} style={{ color: 'var(--accent)' }}>Nous contacter →</a>
      </div>
    </React.Fragment>
  );
};

// ---------------- HERO ----------------
export const Hero = () => (
  <section id="accueil" className="hero">
    <div className="container">
      {/* <div className="hero-meta reveal">
        <div className="hero-meta-row">
          <span>// AGENCE — BURKINA FASO</span>
         
        </div>
        <div className="hero-meta-row">
          <span>v.2026 — ACTIVE</span>
        </div>
      </div> */}

      <h1 className="h-display hero-title reveal">
        Connecter les marques<br/>
        aux bonnes audiences.<br/>
        Créer de <em>l'impact réel</em>.
      </h1>

      <p className="body-lg hero-sub reveal">
        BlendBloc est une agence marketing et événementielle qui aide les entreprises
        et institutions à attirer, engager et convertir leurs audiences en résultats concrets.
      </p>

      <div className="hero-cta reveal">
        <a href="#contact" className="btn btn-primary btn-arrow">Demander un devis</a>
        <a href="#contact" className="btn btn-ghost btn-arrow">Travailler avec nous</a>
      </div>

      <div className="hero-bottom reveal">
        <div className="hero-stat">
          <span className="num">32+</span>
          <span className="label">Institutions mobilisées</span>
        </div>
        <div className="hero-stat">
          <span className="num">1 000+</span>
          <span className="label">Participants terrain</span>
        </div>
        <div className="hero-stat">
          <span className="num">40+</span>
          <span className="label">Partenaires engagés</span>
        </div>
        <div className="hero-stat">
          <span className="num">10+</span>
          <span className="label">Solutions digitales</span>
        </div>
      </div>
    </div>

    <div className="hero-orbit" aria-hidden="true">
      <div className="hero-orbit-ring"></div>
      <div className="hero-orbit-ring r2"></div>
      <div className="hero-orbit-ring r3"></div>
      <div className="hero-orbit-dot"></div>
    </div>
  </section>
);

// ---------------- MARQUEE ----------------
export const Marquee = () => {
  const items = ['Connecter', 'Captiver', 'Convertir'];
  const block = (
    <span>
      {items.map((t, i) => (
        <React.Fragment key={i}>
          {t}
          <span className="dot"></span>
        </React.Fragment>
      ))}
    </span>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {block}{block}{block}{block}
      </div>
    </div>
  );
};

// ---------------- ABOUT ----------------
export const About = () => (
  <section id="a-propos" className="about">
    <div className="container">
      <div className="about-grid">
        <div className="reveal">
          <span className="eyebrow">[ 01 ] À propos</span>
          <h2 className="h-section" style={{ marginTop: 24 }}>
            Qui sommes-<br/>nous<span style={{ color: 'var(--accent)' }}>?</span>
          </h2>
          <div className="about-img-wrap">
            <img src="/assets/photos/aboutUs.jpeg" alt="L'équipe BlendBloc" className="about-img" />
            <div className="about-img-corner tl"></div>
            <div className="about-img-corner br"></div>
          </div>
        </div>

        <div className="reveal">
          <p className="body-lg" style={{ fontSize: '20px', color: 'var(--fg)', marginBottom: 24 }}>
            BlendBloc est une agence marketing et événementielle spécialisée dans la
            conception de stratégies d'acquisition, d'engagement et de conversion.
          </p>
          <p className="body-lg">
            Nous intervenons à la croisée de trois domaines, avec une mission :
            transformer les audiences en communautés actives et en résultats mesurables.
          </p>

          <div className="about-pill-row">
            <div className="about-pill">
              <span className="idx">01</span>
              <span className="name">Marketing stratégique</span>
              <span className="desc">Acquisition · Engagement</span>
            </div>
            <div className="about-pill">
              <span className="idx">02</span>
              <span className="name">Digital & technologie</span>
              <span className="desc">Web · Apps · Automatisation</span>
            </div>
            <div className="about-pill">
              <span className="idx">03</span>
              <span className="name">Événementiel terrain</span>
              <span className="desc">Activation · Logistique</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ---------------- APPROCHE ----------------
export const Approche = () => (
  <section className="approach">
    <div className="container">
      <div className="approach-header reveal">
        <div>
          <span className="eyebrow">[ 02 ] Notre approche</span>
          <h2 className="h-section" style={{ marginTop: 24 }}>
            Une méthode<br/>en 3 étapes.
          </h2>
        </div>
        <p className="body-lg">
          De la stratégie à l'exécution, un processus rigoureux pour transformer
          l'attention en résultats mesurables.
        </p>
      </div>

      <div className="approach-grid reveal">
        <div className="approach-step">
          <div className="num">STEP / 01</div>
          <h3>Connecter<span className="dot"></span></h3>
          <p>Nous identifions et atteignons votre audience cible avec précision, à travers les bons canaux et les bons moments.</p>
        </div>
        <div className="approach-step">
          <div className="num">STEP / 02</div>
          <h3>Captiver<span className="dot"></span></h3>
          <p>Nous créons des contenus, campagnes et expériences qui attirent l'attention et suscitent un véritable intérêt.</p>
        </div>
        <div className="approach-step">
          <div className="num">STEP / 03</div>
          <h3>Convertir<span className="dot"></span></h3>
          <p>Nous transformons l'engagement en résultats concrets : clients, étudiants, ou partenaires durables.</p>
        </div>
      </div>
    </div>
  </section>
);

