// Contrôleur de l'intro : charge GSAP à la demande, filets de sécurité, « Passer », Échap, inert.
import React from 'react';
import { lockScroll } from '../lib/scrollLock.js';

const STORAGE_KEY = 'blendbloc-intro-seen';
const SKIP_SPEED = 6;
const SAFETY_MARGIN_MS = 3000;

const rememberIntro = () => {
  try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch { /* stockage indisponible : l'intro rejouera */ }
};
const setPageInert = (inert) => {
  document.querySelectorAll('[data-site]').forEach((node) => { node.inert = inert; });
};

export const IntroScreen = () => {
  const skipRef = React.useRef(null);
  const skipIntro = React.useRef(() => {});

  React.useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute('data-intro') !== 'play') return undefined;

    let cancelled = false;
    let settled = false;
    let teardown = () => {};

    setPageInert(true);
    lockScroll('intro', true);

    const settle = (state) => {
      if (settled) return;
      settled = true;
      const skipHadFocus = document.activeElement === skipRef.current;
      teardown();
      setPageInert(false);
      lockScroll('intro', false);
      rememberIntro();
      if (state === 'done') root.removeAttribute('data-intro');
      else root.setAttribute('data-intro', 'fallback');
      if (skipHadFocus) document.querySelector('main')?.focus({ preventScroll: true });
    };

    // Le minuteur du <head> a pu abandonner l'intro : la page doit redevenir utilisable.
    const watchdog = new MutationObserver(() => {
      if (root.getAttribute('data-intro') !== 'play') settle('fallback');
    });
    watchdog.observe(root, { attributes: true, attributeFilter: ['data-intro'] });
    teardown = () => watchdog.disconnect();
    skipIntro.current = () => settle('fallback');
    const earlyKey = (e) => { if (e.key === 'Escape') skipIntro.current(); };
    window.addEventListener('keydown', earlyKey);

    (async () => {
      try {
        const [{ gsap }, timeline] = await Promise.all([import('gsap'), import('./introTimeline.js')]);
        if (cancelled || root.getAttribute('data-intro') !== 'play') return;

        const logo = document.querySelector('[data-logo]');
        const slot = document.querySelector('[data-logo-slot]');
        if (!logo || !slot) throw new Error('Logo introuvable');

        window.__bbIntroStarted = true;
        gsap.config({ force3D: false, nullTargetWarn: false });

        const { tl } = timeline.createIntroTimeline(gsap, {
          slot, logo, skip: skipRef.current, onComplete: () => settle('done'),
        });

        const onResize = () => {
          if (tl.time() < tl.labels.flight) timeline.applyCenter(gsap, logo, timeline.measureCenter(slot));
        };
        const safety = window.setTimeout(() => settle('done'), tl.duration() * 1000 + SAFETY_MARGIN_MS);
        // Passer accélère la timeline au lieu de sauter : le logo atterrit proprement en ~1 s.
        skipIntro.current = () => gsap.to(tl, { timeScale: SKIP_SPEED, duration: 0.2, ease: 'none' });
        window.addEventListener('resize', onResize);

        teardown = () => {
          watchdog.disconnect();
          window.clearTimeout(safety);
          window.removeEventListener('resize', onResize);
          window.removeEventListener('keydown', earlyKey);
          gsap.killTweensOf(tl);
          tl.kill();
          timeline.clearIntroStyles(gsap, logo);
        };
        if (import.meta.env.DEV) window.__bbIntroTimeline = tl; // accès de développement pour figer la timeline
      } catch {
        settle('fallback');
      }
    })();

    return () => {
      cancelled = true;
      window.removeEventListener('keydown', earlyKey);
      if (!settled) { teardown(); setPageInert(false); lockScroll('intro', false); }
    };
  }, []);

  return (
    <button ref={skipRef} className="bb-skip" type="button" onClick={() => skipIntro.current()}>
      Passer l'intro
    </button>
  );
};
