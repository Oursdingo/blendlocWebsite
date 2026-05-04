// =============================================
// BlendBloc — Sections (Services, Domaines, Résultats, Pourquoi, Contact, Footer)
// =============================================
import React from 'react';

// ---------------- SERVICES ----------------
export const Services = () => {
  const [open, setOpen] = React.useState(0);
  const items = [
    {
      name: 'Marketing & acquisition',
      tags: ['Stratégies de croissance', 'Campagnes d\'acquisition', 'Réseaux sociaux', 'Activation de communautés'],
      image: '/assets/photos/marketing.jpeg',
    },
    {
      name: 'Digital & technologie',
      tags: ['Sites web', 'Applications mobiles', 'Automatisation', 'Outils CRM'],
      image: '/assets/photos/digital.jpeg',
    },
    {
      name: 'Événementiel',
      tags: ['Organisation d\'événements', 'Activations terrain', 'Tournois & compétitions', 'Gestion logistique'],
      image: '/assets/photos/evenementiel.jpeg',
    },
    {
      name: 'Branding & contenu',
      tags: ['Identité visuelle', 'Design graphique', 'Production de contenu', 'Storytelling de marque'],
      image: '/assets/photos/branding.jpeg',
    },
  ];

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="approach-header reveal" style={{ marginBottom: 64 }}>
          <div>
            <span className="eyebrow">[ 03 ] Nos services</span>
            <h2 className="h-section" style={{ marginTop: 24 }}>
              Quatre pôles.<br/>Une exécution<br/>complète.
            </h2>
          </div>
          <p className="body-lg">
            Cliquez sur un service pour découvrir nos expertises. Chaque pôle peut être
            mobilisé seul ou combiné selon vos objectifs.
          </p>
        </div>

        <div className="services-list reveal">
          {items.map((it, i) => (
            <div
              key={i}
              className={`service-row ${open === i ? 'open' : ''}`}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <div className="service-num">/ {String(i + 1).padStart(2, '0')}</div>
              <div>
                <div className="service-name">{it.name}</div>
                <div className="service-expand">
                  <div className="service-expand-bg" style={{ backgroundImage: `url(${it.image})` }}>
                    <div className="service-expand-overlay"></div>
                    <div className="service-expand-content">
                      <div className="service-expand-title">{it.name}</div>
                      <div className="service-tags">
                        {it.tags.map((t, j) => (
                          <span key={j} className="service-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="service-arrow">+</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------------- DOMAINES ----------------
export const Domaines = () => (
  <section className="domains">
    <div className="container">
      <div className="approach-header reveal" style={{ marginBottom: 56 }}>
        <div>
          <span className="eyebrow">[ 04 ] Domaines d'intervention</span>
          <h2 className="h-section" style={{ marginTop: 24 }}>
            Là où nous<br/>intervenons.
          </h2>
        </div>
      </div>

      <div className="domains-grid reveal">
        <div className="domain-card">
          <div className="num">→ 01</div>
          <h3>Secteur académique<br/><span style={{ color: 'var(--fg-dim)' }}>universités & écoles</span></h3>
        </div>
        <div className="domain-card">
          <div className="num">→ 02</div>
          <h3>Entreprises<br/>& marques</h3>
        </div>
        <div className="domain-card">
          <div className="num">→ 03</div>
          <h3>Organisations<br/>à fort impact</h3>
        </div>
      </div>
    </div>
  </section>
);

// ---------------- RÉSULTATS ----------------
export const Resultats = () => {
  const [counts, setCounts] = React.useState([0, 0, 0, 0]);
  const targets = [32, 1000, 40, 10];
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const dur = 1600;
        const tick = (t) => {
          const p = Math.min((t - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCounts(targets.map(v => Math.round(v * eased)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const labels = [
    'Institutions mobilisées',
    'Participants aux projets terrain',
    'Partenaires engagés',
    'Solutions digitales développées',
  ];

  const fmt = (n) => n >= 1000 ? n.toLocaleString('fr-FR').replace(',', ' ') : n;

  return (
    <section className="results" ref={ref}>
      <div className="container">
        <div className="approach-header reveal" style={{ marginBottom: 0 }}>
          <div>
            <span className="eyebrow">[ 05 ] Résultats</span>
            <h2 className="h-section" style={{ marginTop: 24 }}>
              L'impact, en<br/>chiffres concrets.
            </h2>
          </div>
          <p className="body-lg">
            Présence active dans plusieurs villes du Burkina Faso. Des projets terrain
            qui dépassent l'écran et créent des communautés réelles.
          </p>
        </div>

        <div className="results-grid reveal">
          {targets.map((_, i) => (
            <div key={i} className="result-cell">
              <div className="res-num"><span className="plus">+</span>{fmt(counts[i])}</div>
              <div className="res-label">{labels[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------------- POURQUOI ----------------
export const Pourquoi = () => {
  const items = [
    'Compréhension fine des audiences jeunes et étudiantes',
    'Expérience terrain et digitale en parallèle',
    'Forte capacité de mobilisation rapide',
    'Approche orientée résultats mesurables',
    'Vision stratégique et exécution complète',
    'Présence locale dans plusieurs villes du Burkina',
  ];

  return (
    <section className="why">
      <div className="container">
        <div className="approach-header reveal" style={{ marginBottom: 24 }}>
          <div>
            <span className="eyebrow">[ 06 ] Pourquoi BlendBloc</span>
            <h2 className="h-section" style={{ marginTop: 24 }}>
              Ce qui fait<br/>la différence.
            </h2>
          </div>
        </div>

        <div className="why-grid reveal">
          {items.map((t, i) => (
            <div key={i} className="why-row">
              <span className="num">/ {String(i + 1).padStart(2, '0')}</span>
              <span className="text">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------------- CONTACT ----------------
export const Contact = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', email: '', sujet: '', message: '' });

  const handle = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <span className="eyebrow reveal">[ 07 ] Contact</span>
        <div className="contact-inner reveal" style={{ marginTop: 32 }}>
          <div>
            <h2 className="contact-h">
              Parlons<br/>de votre <span className="accent">projet.</span>
            </h2>
            <p className="body-lg" style={{ marginTop: 24, marginBottom: 48 }}>
              BlendBloc vous accompagne de la stratégie à l'exécution
              pour accélérer votre croissance.
            </p>

            <div className="contact-info">
              <div className="contact-block">
                <div className="label">// Téléphone</div>
                <div className="value">
                  <a href="tel:+22666120184">+226 66 12 01 84</a>
                </div>
                <div className="value" style={{ marginTop: 4 }}>
                  <a href="tel:+22668513260">+226 68 51 32 60</a>
                </div>
              </div>
              <div className="contact-block">
                <div className="label">// Email</div>
                <div className="value">
                  <a href="mailto:contact.blendbloc@gmail.com">contact.blendbloc@gmail.com</a>
                </div>
              </div>
              <div className="contact-block">
                <div className="label">// Localisation</div>
                <div className="value">Burkina Faso · Ouagadougou</div>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="form-success">
                ✓ Message reçu — nous vous recontactons sous 24h
              </div>
            ) : (
              <form className="contact-form" onSubmit={handle}>
                <div className="row">
                  <div>
                    <label>Nom complet</label>
                    <input
                      type="text"
                      placeholder="Votre nom"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="vous@entreprise.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label>Sujet</label>
                  <select
                    value={form.sujet}
                    onChange={e => setForm({ ...form, sujet: e.target.value })}
                  >
                    <option value="">Choisir un sujet…</option>
                    <option>Demande de devis</option>
                    <option>Marketing & acquisition</option>
                    <option>Digital & technologie</option>
                    <option>Événementiel</option>
                    <option>Branding & contenu</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label>Votre message</label>
                  <textarea
                    placeholder="Décrivez votre projet, vos objectifs, votre calendrier…"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-arrow">
                  Envoyer le message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------------- FOOTER ----------------
export const Footer = () => (
  <footer className="footer">
    <div className="footer-top">
      <div>
        <div className="footer-tagline">
          Connecter.<br/>
          Captiver.<br/>
          Convertir<span className="dot">.</span>
        </div>
      </div>
      <div className="footer-col">
        <h4>// Navigation</h4>
        <a href="#accueil">Accueil</a>
        <a href="#a-propos">À propos</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="footer-col">
        <h4>// Contact</h4>
        <a href="mailto:contact.blendbloc@gmail.com">contact.blendbloc@gmail.com</a>
        <a href="tel:+22666120184">+226 66 12 01 84</a>
        <a href="tel:+22668513260">+226 68 51 32 60</a>
        <span style={{ marginTop: 8 }}>Burkina Faso</span>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2026 BlendBloc — Tous droits réservés</span>
      <span>Crafted in Ouagadougou</span>
    </div>
  </footer>
);

