// =============================================
// Routeur minimal (History API) et rideau entre deux pages.
// Au clic sur un lien, la page s'assombrit, le logo se trace en contours,
// puis la page suivante apparaît : environ une seconde en tout.
// =============================================
import React from 'react';
import { Curtain } from '../components/Curtain.jsx';

const RouterContext = React.createContext(null);

const CURTAIN_IN_MS = 300;
const CURTAIN_HOLD_MS = 480;
const CURTAIN_OUT_MS = 320;

const normalize = (path) => {
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

const readLocation = () => ({
  path: normalize(window.location.pathname),
  search: window.location.search,
  hash: window.location.hash,
});

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scrollToHash = (hash, smooth) => {
  if (!hash || hash.length < 2) return false;
  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!target) return false;
  target.scrollIntoView({ behavior: smooth && !reduceMotion() ? 'smooth' : 'auto', block: 'start' });
  return true;
};

export function RouterProvider({ children }) {
  const [location, setLocation] = React.useState(readLocation);
  const [curtain, setCurtain] = React.useState('off');
  const pendingScroll = React.useRef(null);
  const busy = React.useRef(false);
  const timers = React.useRef([]);

  React.useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    const onPop = (event) => {
      pendingScroll.current = { y: event.state?.scroll ?? 0, hash: window.location.hash };
      setLocation(readLocation());
    };
    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  // La nouvelle page est rendue : ancre, position mémorisée (Retour) ou haut de page.
  React.useLayoutEffect(() => {
    const pending = pendingScroll.current;
    if (!pending) return;
    pendingScroll.current = null;
    if (scrollToHash(pending.hash, false)) return;
    window.scrollTo(0, pending.y || 0);
  }, [location]);

  const navigate = React.useCallback((to, { replace = false } = {}) => {
    const url = new URL(to, window.location.href);
    if (url.origin !== window.location.origin) {
      window.location.assign(url.href);
      return;
    }
    const next = { path: normalize(url.pathname), search: url.search, hash: url.hash };
    const current = readLocation();
    const href = `${next.path}${next.search}${next.hash}`;

    const commit = (scrollToTop) => {
      // Mémorise la position actuelle pour le bouton Retour du navigateur.
      window.history.replaceState({ ...(window.history.state || {}), scroll: window.scrollY }, '');
      if (replace) window.history.replaceState({ scroll: window.scrollY }, '', href);
      else window.history.pushState({ scroll: 0 }, '', href);
      pendingScroll.current = scrollToTop ? { y: 0, hash: next.hash } : null;
      setLocation(next);
    };

    // Même page : pas de rideau, seulement l'ancre ou le filtre.
    if (next.path === current.path) {
      if (next.search === current.search && next.hash === current.hash) {
        if (next.hash) scrollToHash(next.hash, true);
        else window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' });
        return;
      }
      commit(false);
      if (next.hash) requestAnimationFrame(() => scrollToHash(next.hash, true));
      return;
    }

    if (busy.current) return;
    if (reduceMotion()) {
      commit(true);
      return;
    }

    busy.current = true;
    setCurtain('in');
    timers.current = [
      setTimeout(() => commit(true), CURTAIN_IN_MS),
      setTimeout(() => setCurtain('out'), CURTAIN_IN_MS + CURTAIN_HOLD_MS),
      setTimeout(() => {
        setCurtain('off');
        busy.current = false;
      }, CURTAIN_IN_MS + CURTAIN_HOLD_MS + CURTAIN_OUT_MS),
    ];
  }, []);

  const value = React.useMemo(() => ({ location, navigate }), [location, navigate]);

  return (
    <RouterContext.Provider value={value}>
      {children}
      <Curtain state={curtain} />
    </RouterContext.Provider>
  );
}

export const useLocation = () => React.useContext(RouterContext).location;
export const useNavigate = () => React.useContext(RouterContext).navigate;
export const useQueryParam = (name) => new URLSearchParams(useLocation().search).get(name);

// Lien interne : laisse le navigateur gérer Ctrl/Cmd + clic, clic molette et target.
export const Link = React.forwardRef(function Link({ to, onClick, target, ...rest }, ref) {
  const { navigate } = React.useContext(RouterContext);
  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (target && target !== '_self') return;
    event.preventDefault();
    navigate(to);
  };
  return <a ref={ref} href={to} target={target} onClick={handleClick} {...rest} />;
});

const DEFAULT_TITLE = 'Blendbloc | Agence marketing et événementielle à Ouagadougou';

export const usePageTitle = (title) => {
  React.useEffect(() => {
    document.title = title ? `${title} | Blendbloc` : DEFAULT_TITLE;
  }, [title]);
};
