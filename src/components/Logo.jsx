// =============================================
// Logo Blendbloc en SVG : emblème doré, mot « Blendbloc » et signature.
// Le logo de l'en-tête est aussi le héros de l'intro : l'intro le déplace, elle ne le remplace jamais.
// =============================================
import React from 'react';
import {
  LOGO_VIEWBOX, LOGO_HEIGHT, MARK_WIDTH, GOLD_STOPS, MARK_FILL, MARK_CONTOURS, LETTERS,
} from '../logoGeometry.js';

// La signature est calée sous le mot « Blendbloc », sur toute sa largeur.
const WORD_X = 1160;
const WORD_WIDTH = 2067;
const TAGLINE_Y = 744;
const TAGLINE_SIZE = 112;

const Tagline = ({ className = 'bb-tagline', intro = false }) => (
  <text
    className={className}
    {...(intro ? { 'data-tagline': '' } : {})}
    x={WORD_X}
    y={TAGLINE_Y}
    fontSize={TAGLINE_SIZE}
    textLength={WORD_WIDTH}
    lengthAdjust="spacing"
  >
    <tspan>Connecter</tspan>
    <tspan className="bb-sep"> _ </tspan>
    <tspan>Captiver</tspan>
    <tspan className="bb-sep"> _ </tspan>
    <tspan>Convertir</tspan>
  </text>
);

const Contour = ({ d }) => <path className="bb-contour" d={d} pathLength={1} />;

/**
 * intro : réservé au logo de l'en-tête (contours, vague dorée, crochets data-* lus par l'intro).
 * tone  : « dark » sur fond clair, « light » sur fond noir.
 */
export function BrandLogo({ intro = false, tone = 'dark' }) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const goldId = intro ? 'bb-gold' : `bb-gold-${uid}`;

  return (
    <svg
      className={`bb-logo bb-logo--${tone}`}
      {...(intro ? { 'data-logo': '' } : {})}
      viewBox={LOGO_VIEWBOX}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={goldId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={MARK_WIDTH} y2="0">
          <stop offset="0" stopColor={GOLD_STOPS[0]} />
          <stop offset="0.5" stopColor={GOLD_STOPS[1]} />
          <stop offset="1" stopColor={GOLD_STOPS[2]} />
        </linearGradient>
        {intro && (
          <>
            {/* Vague de couleur : opaque puis transparente, déplacée en diagonale pendant l'intro. */}
            <linearGradient id="bb-wave" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id="bb-wave-mask" maskUnits="userSpaceOnUse" x="-200" y="-200" width={MARK_WIDTH + 400} height={LOGO_HEIGHT + 400}>
              <rect x="-200" y="-200" width={MARK_WIDTH + 400} height={LOGO_HEIGHT + 400} fill="url(#bb-wave)" />
            </mask>
          </>
        )}
      </defs>

      <g {...(intro ? { 'data-rise': '' } : {})}>
        <g {...(intro ? { 'data-letter': 'mark' } : {})}>
          <path className="bb-gold" fill={`url(#${goldId})`} {...(intro ? { 'data-wave': '' } : {})} d={MARK_FILL} fillRule="evenodd" />
          {intro && MARK_CONTOURS.map((d, i) => <Contour key={i} d={d} />)}
        </g>
        {LETTERS.map((letter, i) => (
          <g key={i} {...(intro ? { 'data-letter': `l${i}` } : {})}>
            <path className="bb-ink" d={letter.fill} />
            {intro && letter.contours.map((d, j) => <Contour key={j} d={d} />)}
          </g>
        ))}
        <Tagline intro={intro} />
      </g>
    </svg>
  );
}

const OUTLINE_PATHS = [
  ...MARK_CONTOURS.map((d) => ({ d, mark: true })),
  ...LETTERS.flatMap((letter) => letter.contours.map((d) => ({ d, mark: false }))),
];

// Logo au trait : rideau entre les pages, filigrane du pied de page.
export function LogoOutline({ className, tagline = false }) {
  return (
    <svg className={className} viewBox={LOGO_VIEWBOX} aria-hidden="true" focusable="false">
      {OUTLINE_PATHS.map((p, i) => (
        <path key={i} d={p.d} pathLength={1} className={p.mark ? 'is-mark' : undefined} />
      ))}
      {tagline && <Tagline className="outline-tagline" />}
    </svg>
  );
}
