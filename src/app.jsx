// =============================================
// Blendbloc — application : en-tête, page courante, pied de page.
// =============================================
import React from 'react';
import { RouterProvider, useLocation } from './lib/router.jsx';
import { IntroScreen } from './intro/IntroScreen.jsx';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Realisations from './pages/Realisations.jsx';
import Projet from './pages/Projet.jsx';
import APropos from './pages/APropos.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

const PAGES = {
  '/': Home,
  '/services': Services,
  '/realisations': Realisations,
  '/a-propos': APropos,
  '/contact': Contact,
};

function renderPage(path) {
  const Page = PAGES[path];
  if (Page) return <Page />;
  const projet = path.match(/^\/realisations\/([a-z0-9-]+)$/);
  if (projet) return <Projet slug={projet[1]} />;
  return <NotFound />;
}

function Layout() {
  const { path } = useLocation();
  const previousPath = React.useRef(path);

  // Après un changement de page, le focus revient au début du contenu.
  React.useEffect(() => {
    if (previousPath.current === path) return;
    previousPath.current = path;
    document.getElementById('contenu')?.focus({ preventScroll: true });
  }, [path]);

  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <IntroScreen />
      <Header />
      <main id="contenu" tabIndex={-1} data-site data-menu-inert key={path}>
        {renderPage(path)}
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <Layout />
    </RouterProvider>
  );
}
