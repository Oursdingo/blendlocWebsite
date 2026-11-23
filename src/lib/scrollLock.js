// Verrou de défilement partagé : la page reste figée tant qu'au moins une source
// le demande (intro, menu mobile).
const locks = new Set();

export const lockScroll = (key, locked) => {
  if (locked) locks.add(key);
  else locks.delete(key);
  document.documentElement.style.overflow = locks.size > 0 ? 'hidden' : '';
};
