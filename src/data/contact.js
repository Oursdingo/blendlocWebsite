// =============================================
// Coordonnées de l'agence : barre noire, pied de page, page Contact.
// Les champs à null ou vides ne s'affichent pas : complétez-les dès que possible.
// =============================================

export const CONTACT = {
  email: 'contact.blendbloc@gmail.com',
  phones: [
    { label: '+226 66 12 01 84', href: 'tel:+22666120184' },
    { label: '+226 68 51 32 60', href: 'tel:+22668513260' },
  ],
  city: 'Ouagadougou, Burkina Faso',

  // À DEMANDER : adresse précise des bureaux (ex. « Secteur 15, rue 15.32, Ouagadougou »).
  address: null,

  // À DEMANDER : horaires d'ouverture (ex. « Du lundi au vendredi, de 8 h à 17 h »).
  // Tant qu'ils manquent, le pied de page indique le délai de réponse.
  hours: null,
  responseTime: 'Sous 24 h, par courriel ou par téléphone',

  // À DEMANDER : liens des réseaux sociaux. Icônes disponibles :
  // facebook, instagram, linkedin, tiktok, youtube.
  // Exemple : { network: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/…' }
  socials: [],
};

export const SIGNATURE = ['Connecter', 'Captiver', 'Convertir'];
