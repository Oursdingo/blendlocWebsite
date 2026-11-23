// =============================================
// Contenus de l'accueil : carrousel, démarche, chiffres.
// =============================================

// Quatre diapositives, une par grand métier, sur de vraies photos de l'agence.
export const SLIDES = [
  {
    id: 'evenementiel',
    title: 'Des événements dont votre public se souvient.',
    text: "Tournois, cérémonies et activations : nous organisons tout, de l'idée à la dernière lumière éteinte.",
    image: '/assets/photos/landing_photo.jpeg',
    focus: '50% 30%',
    secondary: { to: '/realisations', label: 'Voir nos réalisations' },
  },
  {
    id: 'marketing',
    title: 'Les bonnes personnes, au bon moment.',
    text: 'Stratégies de croissance, campagnes et réseaux sociaux pour attirer votre public et le garder.',
    image: '/assets/photos/marketing.jpeg',
    focus: '50% 40%',
    secondary: { to: '/services#marketing', label: 'Découvrir ce pôle' },
  },
  {
    id: 'digital',
    title: 'Des outils digitaux qui servent vos objectifs.',
    text: 'Sites web, applications et automatisations, pensés pour être simples à utiliser.',
    image: '/assets/photos/digital.jpeg',
    focus: '50% 35%',
    secondary: { to: '/services#digital', label: 'Découvrir ce pôle' },
  },
  {
    id: 'branding',
    title: 'Une marque claire, des contenus qui donnent envie.',
    text: 'Identité visuelle, design, photo et vidéo pour raconter votre marque avec justesse.',
    image: '/assets/photos/aboutUs.jpeg',
    focus: '50% 22%',
    secondary: { to: '/a-propos', label: 'Qui sommes-nous' },
  },
];

// Les trois mots de la signature, dans l'ordre réel du travail.
export const DEMARCHE = {
  title: 'Notre démarche',
  intro: "Connecter, Captiver, Convertir : notre signature décrit aussi l'ordre dans lequel nous travaillons, sur chaque projet.",
  steps: [
    {
      title: 'Connecter',
      text: 'Nous commençons par votre public : qui il est, où le trouver, par quels canaux et à quel moment lui parler.',
    },
    {
      title: 'Captiver',
      text: "Contenus, campagnes et expériences sur le terrain retiennent l'attention et donnent envie d'aller plus loin.",
    },
    {
      title: 'Convertir',
      text: "L'intérêt devient un résultat concret : des clients, des étudiants inscrits ou des partenaires qui restent.",
    },
  ],
};

// À CONFIRMER avec l'agence : valeurs et lignes de contexte.
export const CHIFFRES = [
  {
    value: '32',
    label: 'institutions mobilisées',
    context: 'Universités, écoles, entreprises et organisations qui nous ont confié leurs publics.',
  },
  {
    value: '1 000',
    label: 'participants terrain',
    context: 'Plus de mille personnes réunies sur nos tournois, activations et cérémonies.',
  },
  {
    value: '40',
    label: 'partenaires engagés',
    context: 'Marques, médias et prestataires associés à nos projets.',
  },
  {
    value: '10',
    label: 'solutions digitales',
    context: 'Sites, applications et outils automatisés livrés à nos clients.',
  },
];

// Page À propos : ce qui fait la différence.
export const DIFFERENCES = [
  { title: 'Les publics jeunes et étudiants', text: 'Nous connaissons leurs codes, leurs canaux et ce qui les fait se déplacer.' },
  { title: 'Le terrain et le digital, ensemble', text: "La même équipe mène l'événement et la campagne en ligne qui l'accompagne." },
  { title: 'Une mobilisation rapide', text: 'Nous savons réunir un public, des partenaires et des équipes dans des délais courts.' },
  { title: 'Des résultats mesurables', text: 'Nous fixons des objectifs clairs et suivons ce que chaque action rapporte.' },
  { title: "De la stratégie à l'exécution", text: 'Un seul interlocuteur pense votre projet et le mène jusqu\'au bout.' },
  { title: 'Une présence locale', text: 'Nous intervenons dans plusieurs villes du Burkina Faso.' },
];
