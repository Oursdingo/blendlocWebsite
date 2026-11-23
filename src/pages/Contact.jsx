// =============================================
// Contact : photo et formulaire côte à côte, puis les coordonnées.
// Le formulaire prépare un courriel dans la messagerie du visiteur (aucun serveur requis).
// =============================================
import React from 'react';
import { useQueryParam, usePageTitle } from '../lib/router.jsx';
import { PageBanner } from '../components/PageBanner.jsx';
import { ContactBand } from '../components/ContactBand.jsx';
import { CONTACT } from '../data/contact.js';

const BESOINS = [
  { id: 'devis', label: 'Demande de devis' },
  { id: 'marketing', label: 'Marketing et acquisition' },
  { id: 'digital', label: 'Digital et technologie' },
  { id: 'evenementiel', label: 'Événementiel' },
  { id: 'branding', label: 'Branding et contenu' },
  { id: 'autre', label: 'Autre demande' },
];
const validBesoin = (id) => (BESOINS.some((b) => b.id === id) ? id : 'devis');
const EMPTY = { nom: '', email: '', telephone: '', message: '' };

export default function Contact() {
  usePageTitle('Contact');
  const preset = useQueryParam('besoin');
  const [form, setForm] = React.useState(() => ({ ...EMPTY, besoin: validBesoin(preset) }));
  const [sent, setSent] = React.useState(false);

  // « Demander un devis » cliqué depuis cette page : le besoin suit le lien.
  React.useEffect(() => {
    if (preset) setForm((f) => ({ ...f, besoin: validBesoin(preset) }));
  }, [preset]);

  const update = (key) => (event) => setForm((f) => ({ ...f, [key]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    const besoin = BESOINS.find((b) => b.id === form.besoin)?.label ?? 'Demande';
    const lines = [`Nom : ${form.nom}`, `Courriel : ${form.email}`];
    if (form.telephone) lines.push(`Téléphone : ${form.telephone}`);
    lines.push(`Besoin : ${besoin}`, '', form.message);
    const subject = `${besoin} - ${form.nom}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    setSent(true);
  };

  return (
    <>
      <PageBanner title="Contact" image="/assets/photos/digital.jpeg" focus="50% 35%">
        Un événement, une campagne, un site à lancer ? Parlons de votre projet.
      </PageBanner>

      <div data-intro-rest>
        <section className="section">
          <div className="container">
            <div className="contact-layout">
              <div className="contact-photo">
                <img src="/assets/photos/aboutUs.jpeg" alt="L'équipe Blendbloc" loading="lazy" />
              </div>

              <div className="contact-panel">
                {sent ? (
                  <div className="sent" role="status">
                    <h2 className="h2">Votre message est prêt</h2>
                    <p className="lead">
                      Votre messagerie s'est ouverte avec votre message : il ne reste qu'à l'envoyer.
                      Nous vous répondons sous 24 h.
                    </p>
                    <p>
                      Rien ne s'est ouvert ? Écrivez-nous à{' '}
                      <a className="text-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>{' '}
                      ou appelez le{' '}
                      <a className="text-link" href={CONTACT.phones[0].href}>{CONTACT.phones[0].label}</a>.
                    </p>
                    <button type="button" className="btn btn-outline" onClick={() => { setForm({ ...EMPTY, besoin: 'devis' }); setSent(false); }}>
                      Écrire un autre message
                    </button>
                  </div>
                ) : (
                  <form className="form" onSubmit={submit}>
                    <h2 className="h2">Écrivez-nous</h2>
                    <p className="form-intro">Tous les champs sont obligatoires, sauf le téléphone.</p>
                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="f-nom">Nom complet</label>
                        <input id="f-nom" name="nom" autoComplete="name" value={form.nom} onChange={update('nom')} required />
                      </div>
                      <div className="field">
                        <label htmlFor="f-email">Courriel</label>
                        <input id="f-email" name="email" type="email" autoComplete="email" value={form.email} onChange={update('email')} required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="f-tel">Téléphone</label>
                        <input id="f-tel" name="telephone" type="tel" autoComplete="tel" value={form.telephone} onChange={update('telephone')} />
                      </div>
                      <div className="field">
                        <label htmlFor="f-besoin">Votre besoin</label>
                        <select id="f-besoin" name="besoin" value={form.besoin} onChange={update('besoin')}>
                          {BESOINS.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="field">
                      <label htmlFor="f-message">Votre message</label>
                      <textarea id="f-message" name="message" rows={6} value={form.message} onChange={update('message')} required />
                    </div>
                    <button type="submit" className="btn btn-gold">Envoyer le message</button>
                    <p className="form-note">Le bouton ouvre votre messagerie avec votre message prêt à partir.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="section alt contact-coords" aria-labelledby="coordonnees-titre">
          <div className="container">
            <h2 id="coordonnees-titre" className="h2">Nos coordonnées</h2>
            <ContactBand tone="light" />
          </div>
        </section>
      </div>
    </>
  );
}
