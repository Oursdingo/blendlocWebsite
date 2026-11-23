import React from 'react';
import { Link, usePageTitle } from '../lib/router.jsx';

export default function NotFound() {
  usePageTitle('Page introuvable');
  return (
    <section className="section notfound" data-intro-rest>
      <div className="container">
        <h1 className="h1">Page introuvable</h1>
        <p className="lead">Cette adresse ne correspond à aucune page du site.</p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-gold">Retour à l'accueil</Link>
          <Link to="/contact" className="link">Nous contacter</Link>
        </div>
      </div>
    </section>
  );
}
