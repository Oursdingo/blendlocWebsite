// Les sept temps de l'intro Blendbloc (environ 7 secondes). Chaque étape démarre avant la fin
// de la précédente : l'intro doit se lire comme un seul geste.
//   ~1,5 s  les contours se dessinent en traits blancs, lettre après lettre
//   ~3,3 s  la signature apparaît mot par mot sous le logo
//   ~4,5 s  une vague dorée traverse l'emblème, le fond s'éclaircit
//   ~5,7 s  le logo en couleur, sur fond blanc
//   ~6,3 s  le logo rétrécit et glisse vers sa place dans l'en-tête
//   ~6,9 s  les liens, puis le carrousel, apparaissent
import { LOGO_WIDTH, LETTERS } from '../logoGeometry.js';

const STAGE_PAPER = '#ffffff';   // fond blanc du site
const TAGLINE_INK = '#6b6355';   // couleur finale de la signature
const CONTOUR_PX = 1.4;
const LETTER_ORDER = ['mark', ...LETTERS.map((_, i) => `l${i}`)];
const LETTER_DRAW = 1.55;
const LETTER_STAGGER = 0.11;
const LETTER_GLIDE_PX = 10;

// Vague inclinée : avant le symbole (transparent partout), puis au-delà (opaque partout).
const WAVE_FROM = { x1: -620, y1: -520, x2: -170, y2: -142 };
const WAVE_TO = { x1: 1200, y1: 1010, x2: 1650, y2: 1388 };

// Place le logo au centre à partir de sa position finale dans l'en-tête.
export function measureCenter(slot) {
  const box = slot.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;
  const ratio = box.height / box.width;
  const width = Math.min(vw * (vw < 700 ? 0.86 : 0.6), 940, (vh * 0.5) / ratio);
  const scale = width / box.width;
  return {
    x: (vw - width) / 2 - box.left,
    y: (vh - width * ratio) / 2 - box.top - Math.min(24, vh * 0.03),
    scale,
    unit: LOGO_WIDTH / width,
  };
}

export function applyCenter(gsap, logo, placement) {
  gsap.set(logo, { x: placement.x, y: placement.y, scale: placement.scale, transformOrigin: '0 0' });
  logo.style.setProperty('--bb-contour', `${CONTOUR_PX * placement.unit}`);
}

// Le tiret est centré sur le point de départ du tracé : il grandit vers ses deux extrémités.
function setContourProgress(path, p) {
  path.style.strokeDasharray = `${p} ${1 - p}`;
  path.style.strokeDashoffset = `${p / 2}`;
}

export function createIntroTimeline(gsap, { slot, logo, skip, onComplete }) {
  const root = document.documentElement;
  const q = gsap.utils.selector(logo);
  const placement = measureCenter(slot);
  const unit = placement.unit;
  const rise = Math.max(8, Math.min(15, 34 / unit)) * unit;

  const contours = q('.bb-contour');
  const gold = q('[data-wave]');
  const ink = q('.bb-ink');
  const wave = logo.querySelector('#bb-wave');
  const riser = q('[data-rise]');
  const tagline = q('[data-tagline]');
  const words = q('[data-tagline] tspan');
  const navItems = gsap.utils.toArray('[data-nav-item]');
  const heroItems = gsap.utils.toArray('[data-hero-item]');
  const fadeItems = gsap.utils.toArray('[data-hero-fade]');

  applyCenter(gsap, logo, placement);

  gsap.set(logo, { autoAlpha: 1 });
  gsap.set(contours, { opacity: 0 });
  contours.forEach((p) => setContourProgress(p, 0));
  gsap.set(q('[data-letter]'), { y: LETTER_GLIDE_PX * unit });
  gold.forEach((p) => p.setAttribute('mask', 'url(#bb-wave-mask)'));
  gsap.set(wave, { attr: WAVE_FROM });
  gsap.set(riser, { y: rise });
  gsap.set(ink, { opacity: 0 }); // l'encre naît avec le fond clair, jamais en gris sur noir
  gsap.set(words, { opacity: 0 });
  gsap.set(tagline, { fill: '#ffffff' });

  const tl = gsap.timeline({ onComplete });

  // Temps 1 et 2 : écran noir, puis chaque contour naît d'un point et s'ouvre des deux côtés.
  tl.addLabel('draw', 0.5);
  LETTER_ORDER.forEach((letter, index) => {
    const at = `draw+=${index * LETTER_STAGGER}`;
    const group = q(`[data-letter="${letter}"]`);
    const paths = q(`[data-letter="${letter}"] .bb-contour`);
    tl.to(group, { y: 0, duration: LETTER_DRAW, ease: 'sine.out' }, at);
    tl.to(paths, { opacity: 1, duration: 0.7, ease: 'sine.out', stagger: 0.04 }, at);
    paths.forEach((path, i) => {
      const prog = { v: 0 };
      tl.to(prog, { v: 1, duration: LETTER_DRAW, ease: 'sine.inOut', onUpdate: () => setContourProgress(path, prog.v) }, `${at}+=${i * 0.04}`);
    });
  });

  // Temps 3 : le logo monte pendant que les derniers contours se referment, la signature apparaît mot par mot.
  tl.addLabel('signature', 'draw+=2.2');
  tl.to(riser, { y: 0, duration: 1.2, ease: 'power2.inOut' }, 'signature');
  tl.to(words, { opacity: 1, duration: 0.8, ease: 'sine.out', stagger: 0.16 }, 'signature+=0.25');

  // Temps 4 : une seule vague d'or traverse l'emblème pendant que le fond s'éclaire.
  tl.addLabel('color', 'draw+=3.1');
  tl.to(wave, { attr: WAVE_TO, duration: 2, ease: 'sine.inOut' }, 'color');
  tl.addLabel('paper', 'color+=0.4');
  tl.to(root, { backgroundColor: STAGE_PAPER, duration: 2, ease: 'sine.inOut' }, 'paper');
  tl.to(ink, { opacity: 1, duration: 1.6, ease: 'sine.inOut' }, 'paper');
  tl.to(contours, { opacity: 0, duration: 1.4, ease: 'sine.inOut' }, 'paper+=0.1');
  tl.to(tagline, { fill: TAGLINE_INK, duration: 0.8, ease: 'sine.inOut' }, 'paper+=0.55');
  if (skip) tl.to(skip, { color: '#17140e', duration: 0.8, ease: 'sine.inOut' }, 'paper+=0.55');

  // Temps 5 : le logo complet, signature comprise, glisse vers sa place réelle.
  tl.addLabel('flight', 'paper+=1.75');
  tl.set(logo, { willChange: 'transform' }, 'flight');
  tl.to(logo, { x: 0, y: 0, scale: 1, force3D: true, duration: 1.45, ease: 'power3.inOut' }, 'flight');
  if (skip) tl.to(skip, { autoAlpha: 0, duration: 0.5, ease: 'sine.out' }, 'flight');

  // Temps 6 : la barre de contacts et les liens apparaissent pendant que le logo ralentit.
  tl.addLabel('nav', 'flight+=0.8');
  tl.fromTo(navItems, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'sine.out', stagger: 0.05 }, 'nav');

  // Temps 7 : le carrousel (ou le bandeau de la page) se révèle.
  tl.addLabel('hero', 'flight+=1');
  if (fadeItems.length) tl.fromTo(fadeItems, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.1, ease: 'sine.out' }, 'hero-=0.15');
  if (heroItems.length) tl.fromTo(heroItems, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.08 }, 'hero');

  return { tl };
}

export function clearIntroStyles(gsap, logo) {
  const q = gsap.utils.selector(logo);
  q('[data-wave]').forEach((p) => p.removeAttribute('mask'));
  q('.bb-contour').forEach((p) => { p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; });
  gsap.set(
    [logo, ...q('.bb-contour'), ...q('.bb-ink'), ...q('[data-letter]'), ...q('[data-rise]'), ...q('[data-tagline]'), ...q('[data-tagline] tspan'),
      '[data-nav-item]', '[data-hero-item]', '[data-hero-fade]', document.documentElement],
    { clearProps: 'all' },
  );
  logo.style.removeProperty('--bb-contour');
}
