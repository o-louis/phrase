import type { Phrase } from '~/types/content'

export const phrases: Phrase[] = [
  // Directions
  { id: 'directions-1', contextId: 'directions', langPackId: 'fr-en', source: 'Continuez tout droit et prenez la deuxième à droite.', target: 'Keep going straight and take the second turn on the right.' },
  { id: 'directions-2', contextId: 'directions', langPackId: 'fr-en', source: "C'est à environ cinq minutes à pied d'ici.", target: "It's about a five-minute walk from here." },
  { id: 'directions-3', contextId: 'directions', langPackId: 'fr-en', source: 'Vous ne pouvez pas le rater, c\'est juste en face de la pharmacie.', target: "You can't miss it, it's right across from the pharmacy." },
  { id: 'directions-4', contextId: 'directions', langPackId: 'fr-en', source: "Désolé, je ne suis pas du coin, je ne peux pas vous aider.", target: "Sorry, I'm not from around here, I can't help you." },
  { id: 'directions-5', contextId: 'directions', langPackId: 'fr-en', source: 'Prenez la première sortie au rond-point.', target: 'Take the first exit at the roundabout.' },
  { id: 'directions-6', contextId: 'directions', langPackId: 'fr-en', source: "C'est à deux pâtés de maisons d'ici.", target: "It's two blocks from here." },
  { id: 'directions-7', contextId: 'directions', langPackId: 'fr-en', source: 'Vous êtes allé trop loin, il faut faire demi-tour.', target: "You've gone too far, you need to turn back." },
  { id: 'directions-8', contextId: 'directions', langPackId: 'fr-en', source: 'Le plus simple, c\'est de suivre les panneaux.', target: 'The easiest way is to follow the signs.' },

  // Restaurant
  { id: 'restaurant-1', contextId: 'restaurant', langPackId: 'fr-en', source: 'Je vais prendre la même chose que lui.', target: "I'll have the same as him." },
  { id: 'restaurant-2', contextId: 'restaurant', langPackId: 'fr-en', source: "On pourrait avoir l'addition, s'il vous plaît ?", target: 'Could we get the check, please?' },
  { id: 'restaurant-3', contextId: 'restaurant', langPackId: 'fr-en', source: "Est-ce que c'est épicé ?", target: 'Is this spicy?' },
  { id: 'restaurant-4', contextId: 'restaurant', langPackId: 'fr-en', source: 'Je suis allergique aux fruits de mer.', target: "I'm allergic to shellfish." },
  { id: 'restaurant-5', contextId: 'restaurant', langPackId: 'fr-en', source: "On partage l'addition en deux ?", target: 'Shall we split the bill?' },
  { id: 'restaurant-6', contextId: 'restaurant', langPackId: 'fr-en', source: 'Ça sent vraiment bon, qu\'est-ce que c\'est ?', target: 'That smells really good, what is it?' },
  { id: 'restaurant-7', contextId: 'restaurant', langPackId: 'fr-en', source: "Je n'ai pas encore décidé, je reviens vers vous dans un instant.", target: "I haven't decided yet, I'll get back to you in a minute." },
  { id: 'restaurant-8', contextId: 'restaurant', langPackId: 'fr-en', source: 'Tout était délicieux, merci.', target: 'Everything was delicious, thank you.' },

  // Small talk
  { id: 'small-talk-1', contextId: 'small-talk', langPackId: 'fr-en', source: 'Ça fait un bail, comment tu vas ?', target: "It's been ages, how are you doing?", register: 'casual' },
  { id: 'small-talk-2', contextId: 'small-talk', langPackId: 'fr-en', source: 'Qu\'est-ce que tu deviens ces derniers temps ?', target: 'What have you been up to lately?', register: 'casual' },
  { id: 'small-talk-3', contextId: 'small-talk', langPackId: 'fr-en', source: 'Il fait un temps de chien aujourd\'hui.', target: "The weather's awful today.", register: 'casual' },
  { id: 'small-talk-4', contextId: 'small-talk', langPackId: 'fr-en', source: 'Je suis un peu débordé en ce moment.', target: "I'm a bit swamped right now.", register: 'casual' },
  { id: 'small-talk-5', contextId: 'small-talk', langPackId: 'fr-en', source: 'On devrait se revoir un de ces jours.', target: 'We should catch up sometime.', register: 'casual' },
  { id: 'small-talk-6', contextId: 'small-talk', langPackId: 'fr-en', source: 'Sans vouloir te presser, mais je dois y aller.', target: 'Not to rush you, but I have to get going.', register: 'casual' },
  { id: 'small-talk-7', contextId: 'small-talk', langPackId: 'fr-en', source: 'Ça te dit d\'aller boire un verre après le travail ?', target: 'Fancy grabbing a drink after work?', register: 'casual' },
  { id: 'small-talk-8', contextId: 'small-talk', langPackId: 'fr-en', source: 'Enchanté, j\'ai beaucoup entendu parler de toi.', target: "Nice to meet you, I've heard a lot about you.", register: 'casual' },

  // Meeting
  { id: 'meeting-1', contextId: 'meeting', langPackId: 'fr-en', source: 'Je pense qu\'on s\'éloigne un peu du sujet.', target: "I think we're getting a bit off track.", register: 'formal' },
  { id: 'meeting-2', contextId: 'meeting', langPackId: 'fr-en', source: 'Est-ce qu\'on peut revenir sur ce point plus tard ?', target: 'Can we circle back to that point later?', register: 'formal' },
  { id: 'meeting-3', contextId: 'meeting', langPackId: 'fr-en', source: 'Je suis tout à fait d\'accord avec ce que tu viens de dire.', target: 'I completely agree with what you just said.', register: 'formal' },
  { id: 'meeting-4', contextId: 'meeting', langPackId: 'fr-en', source: 'Je vais devoir vérifier et je reviens vers vous.', target: "I'll have to check and get back to you.", register: 'formal' },
  { id: 'meeting-5', contextId: 'meeting', langPackId: 'fr-en', source: 'Pour résumer, on est alignés sur les prochaines étapes.', target: "To sum up, we're aligned on the next steps.", register: 'formal' },
  { id: 'meeting-6', contextId: 'meeting', langPackId: 'fr-en', source: 'Désolé de vous interrompre, mais j\'ai une question rapide.', target: 'Sorry to interrupt, but I have a quick question.', register: 'formal' },
  { id: 'meeting-7', contextId: 'meeting', langPackId: 'fr-en', source: 'On est un peu serrés niveau timing, on peut avancer ?', target: "We're a bit tight on time, can we move on?", register: 'formal' },
  { id: 'meeting-8', contextId: 'meeting', langPackId: 'fr-en', source: 'Je vous tiens au courant d\'ici la fin de semaine.', target: "I'll keep you posted by the end of the week.", register: 'formal' }
]
