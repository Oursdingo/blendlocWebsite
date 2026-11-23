// =============================================
// Les quatre pôles : sous-menu, bandeau des métiers de l'accueil, page Services.
// =============================================

export const SERVICES = [
  {
    id: 'marketing',
    name: 'Marketing et acquisition',
    short: 'Des stratégies et des campagnes qui font venir les bonnes personnes.',
    intro: 'Nous construisons des stratégies de croissance et des campagnes qui font venir les bonnes personnes, au bon moment.',
    text: "Tout part de votre public : qui il est, où il se trouve, ce qui le fait bouger. Nous choisissons ensuite les canaux, les messages et le calendrier qui vous rapprochent de vos objectifs, puis nous suivons ce que chaque action rapporte.",
    items: ['Stratégies de croissance', "Campagnes d'acquisition", 'Réseaux sociaux', 'Publicité ciblée'],
    image: '/assets/photos/marketing.jpeg',
    alt: 'Supporters réunis dans les tribunes pendant la Dream League',
  },
  {
    id: 'digital',
    name: 'Digital et technologie',
    short: 'Sites, applications et automatisations simples à utiliser.',
    intro: 'Des outils digitaux qui servent vos objectifs : sites, applications et automatisations simples à utiliser.',
    text: "Nous concevons des outils pensés pour ceux qui s'en servent chaque jour. Un site qui présente clairement votre offre, une application qui simplifie une démarche, un tableau de bord qui montre vos résultats sans effort.",
    items: ['Sites web', 'Applications mobiles', 'Automatisation', 'Tableaux de bord'],
    image: '/assets/photos/digital.jpeg',
    alt: 'Jeunes participants à la campagne « Never Give Up » à Ouagadougou',
  },
  {
    id: 'evenementiel',
    name: 'Événementiel',
    short: 'Tournois, cérémonies et activations organisés de bout en bout.',
    intro: "De l'idée à la dernière lumière éteinte : tournois, cérémonies et activations organisés de bout en bout.",
    text: "Nous prenons en charge l'organisation complète : conception, partenaires, logistique, accueil du public et couverture photo. Le jour J, une seule équipe coordonne tout, pour que vous puissiez vous consacrer à vos invités.",
    items: ["Organisation d'événements", 'Activations terrain', 'Tournois et compétitions', 'Logistique'],
    image: '/assets/photos/evenementiel.jpeg',
    alt: 'Public installé dans une salle lors d\'une cérémonie',
  },
  {
    id: 'branding',
    name: 'Branding et contenu',
    short: 'Identité visuelle, design, photo et vidéo.',
    intro: 'Une identité claire et des contenus qui donnent envie : design, photo, vidéo et récit de marque.',
    text: "Nous donnons à votre marque une image cohérente, du logo aux tenues de vos équipes. Puis nous produisons les contenus qui la font vivre : visuels, photos, vidéos et messages adaptés à chaque canal.",
    items: ['Identité visuelle', 'Design graphique', 'Photo et vidéo', 'Storytelling'],
    image: '/assets/photos/branding.jpeg',
    alt: 'Mascotte en animation au bord d\'un terrain',
  },
];

export const SERVICES_BY_ID = Object.fromEntries(SERVICES.map((s) => [s.id, s]));
