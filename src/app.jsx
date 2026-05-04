// =============================================
// BlendBloc — App root
// =============================================

import React from 'react';
import { Nav, Hero, Marquee, About, Approche, useReveal } from './sections-1.jsx';
import { Services, Domaines, Resultats, Pourquoi, Contact, Footer } from './sections-2.jsx';
import { TweaksPanel, useTweaks, TweakSection, TweakRadio } from './tweaks-panel.jsx';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark"
}/*EDITMODE-END*/;

const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const theme = tweaks.theme || 'dark';

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTweak('theme', theme === 'dark' ? 'light' : 'dark');
  };

  // Reveal-on-scroll observer
  useReveal();

  return (
    <React.Fragment>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Approche />
        <Services />
        <Domaines />
        <Resultats />
        <Pourquoi />
        <Contact />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Thème" />
        <TweakRadio
          label="Mode"
          value={theme}
          options={[
            { value: 'dark', label: 'Sombre' },
            { value: 'light', label: 'Clair' },
          ]}
          onChange={v => setTweak('theme', v)}
        />
      </TweaksPanel>
    </React.Fragment>
  );
};

export default App;
