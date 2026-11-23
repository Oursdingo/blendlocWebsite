// =============================================
// Réalisations : accueil (les cinq premières), page Réalisations, fiches projet.
// ---------------------------------------------
// Pour ajouter un projet :
//   1. Déposez la photo dans public/assets/realisations/
//   2. Ajoutez un objet ci-dessous (le premier de la liste est mis en grand sur l'accueil).
//   service : marketing | digital | evenementiel | branding
//   domaine : academique | entreprises | impact
//   badge   : initiale et couleur du client, en attendant son logo (logo: '/assets/…' le remplace).
//
// À CONFIRMER avec l'agence : client et domaine de chaque projet, et l'accord
// des clients pour montrer leur logo.
// =============================================

export const PROJETS = [
  {
    slug: 'finale-dream-league',
    title: 'Finale de la Dream League',
    client: 'Dream League',
    service: 'evenementiel',
    domaine: 'entreprises',
    place: 'Ouagadougou',
    year: '2025',
    summary: 'Organisation de la finale et de la remise du trophée, avec couverture photo et réseaux sociaux.',
    tasks: ['Organisation de la finale', 'Cérémonie de remise du trophée', 'Couverture photo', 'Animation des réseaux sociaux'],
    image: '/assets/photos/landing_photo.jpeg',
    alt: 'Joueurs et supporters célébrant le trophée de la Dream League',
    focus: '50% 35%',
    badge: { initial: 'D', color: '#1f3550' },
  },
  {
    slug: 'campagne-never-give-up',
    title: 'Campagne « Never Give Up »',
    client: 'Never Give Up',
    service: 'marketing',
    domaine: 'academique',
    place: 'Ouagadougou',
    year: '2025',
    summary: 'Opération de sensibilisation de proximité auprès des jeunes, avec supports imprimés et textiles.',
    tasks: ['Sensibilisation de proximité', 'Supports imprimés', 'Textiles de campagne', 'Mobilisation des jeunes'],
    image: '/assets/photos/digital.jpeg',
    alt: 'Jeunes portant les t-shirts de la campagne « Never Give Up »',
    focus: '60% 35%',
    badge: { initial: 'N', color: '#17140e' },
  },
  {
    slug: 'ceremonie-et-conference',
    title: 'Cérémonie et conférence',
    client: null,
    service: 'evenementiel',
    domaine: 'impact',
    place: 'Ouagadougou',
    year: '2025',
    summary: 'Accueil du public, mise en place de la salle et mobilisation des invités.',
    tasks: ['Accueil du public', 'Mise en place de la salle', 'Mobilisation des invités'],
    image: '/assets/photos/evenementiel.jpeg',
    alt: 'Invitées installées dans la salle pendant la cérémonie',
    focus: '50% 55%',
    badge: { initial: 'C', color: '#7a3e1d' },
  },
  {
    slug: 'mobilisation-des-supporters',
    title: 'Mobilisation des supporters',
    client: 'Dream League',
    service: 'marketing',
    domaine: 'entreprises',
    place: 'Ouagadougou',
    year: '2025',
    summary: 'Animation des tribunes et engagement du public tout au long de la compétition.',
    tasks: ['Animation des tribunes', 'Engagement du public', 'Présence sur toute la compétition'],
    image: '/assets/photos/marketing.jpeg',
    alt: 'Supporters attentifs dans les tribunes',
    focus: '50% 40%',
    badge: { initial: 'D', color: '#1f3550' },
  },
  {
    slug: 'animation-mascotte',
    title: 'Animation mascotte',
    client: null,
    service: 'evenementiel',
    domaine: 'entreprises',
    place: 'Ouagadougou',
    year: '2025',
    summary: 'Mascotte et animations pour créer de la proximité avec les familles et les jeunes.',
    tasks: ['Mascotte', 'Animations pour les familles et les jeunes'],
    image: '/assets/photos/branding.jpeg',
    alt: 'Mascotte saluant le public au bord du terrain',
    focus: '50% 30%',
    badge: { initial: 'A', color: '#2f5141' },
  },
  {
    slug: 'identite-et-tenues-blendbloc',
    title: 'Identité et tenues Blendbloc',
    client: 'Blendbloc',
    service: 'branding',
    domaine: 'entreprises',
    place: 'Ouagadougou',
    year: '2026',
    summary: "Déclinaison de l'identité visuelle sur les tenues de l'équipe et shooting officiel.",
    tasks: ["Déclinaison de l'identité visuelle", "Tenues de l'équipe", 'Shooting officiel'],
    image: '/assets/photos/aboutUs.jpeg',
    alt: "L'équipe Blendbloc dans ses tenues aux couleurs de l'agence",
    focus: '50% 25%',
    badge: { initial: 'B', color: '#b07d0a' },
  },
];

export const findProjet = (slug) => PROJETS.find((p) => p.slug === slug);
