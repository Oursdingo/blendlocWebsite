// Bande de contacts : Nous écrire, Nous appeler, Nous rendre visite, Nos horaires.
// Utilisée en noir dans le pied de page et en clair sur la page Contact.
import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { CONTACT } from '../data/contact.js';

export function ContactBand({ tone = 'dark', className = '' }) {
  const items = [
    {
      icon: Mail,
      label: 'Nous écrire',
      content: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>,
    },
    {
      icon: Phone,
      label: 'Nous appeler',
      content: CONTACT.phones.map((p) => <a key={p.href} href={p.href}>{p.label}</a>),
    },
    {
      icon: MapPin,
      label: 'Nous rendre visite',
      content: <span>{CONTACT.address ? `${CONTACT.address}, ${CONTACT.city}` : CONTACT.city}</span>,
    },
    {
      icon: Clock,
      label: CONTACT.hours ? 'Nos horaires' : 'Notre réponse',
      content: <span>{CONTACT.hours || CONTACT.responseTime}</span>,
    },
  ];

  return (
    <ul className={`contact-band contact-band--${tone} ${className}`.trim()}>
      {items.map(({ icon: Icon, label, content }) => (
        <li key={label}>
          <span className="cb-icon" aria-hidden="true"><Icon size={18} /></span>
          <div className="cb-text">
            <p className="cb-label">{label}</p>
            {content}
          </div>
        </li>
      ))}
    </ul>
  );
}
