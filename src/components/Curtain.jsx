// Rideau entre deux pages : fond sombre et logo de Blendbloc tracé en contours.
import React from 'react';
import { LogoOutline } from './Logo.jsx';

export function Curtain({ state }) {
  return (
    <div className={`curtain${state === 'off' ? '' : ` is-${state}`}`} aria-hidden="true">
      <LogoOutline className="curtain-logo" tagline />
    </div>
  );
}
