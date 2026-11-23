// =============================================
// « Là où nous intervenons » : les trois domaines.
// Chaque domaine mène à la page Réalisations filtrée (?domaine=…).
// =============================================

export const DOMAINES = [
  {
    id: 'academique',
    name: 'Secteur académique',
    text: 'Universités, grandes écoles et centres de formation : recrutement, visibilité et vie étudiante.',
    image: '/assets/photos/digital.jpeg',
    focus: '70% 40%',
  },
  {
    id: 'entreprises',
    name: 'Entreprises et marques',
    text: 'Lancements, notoriété et acquisition de clients, en ligne comme sur le terrain.',
    image: '/assets/photos/branding.jpeg',
    focus: '50% 30%',
  },
  {
    id: 'impact',
    name: 'Organisations à fort impact',
    text: 'ONG, institutions et projets citoyens : mobilisation et sensibilisation des publics.',
    image: '/assets/photos/evenementiel.jpeg',
    focus: '50% 60%',
  },
];

export const DOMAINES_BY_ID = Object.fromEntries(DOMAINES.map((d) => [d.id, d]));
