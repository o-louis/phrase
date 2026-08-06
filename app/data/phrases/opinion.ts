import type { Phrase } from '~/types/content'

// Deliberately dense in the adverbs that carry nuance in natural speech
// (actually, apparently, entirely, rather, roughly, frankly, honestly).
export const opinion: Phrase[] = [
  { id: 'opinion-1', contextId: 'opinion', langPackId: 'fr-en', source: 'Je vois ce que tu veux dire, mais je ne suis pas totalement convaincu.', target: "I see your point, but I'm not entirely convinced." },
  { id: 'opinion-2', contextId: 'opinion', langPackId: 'fr-en', source: "En fait, j'allais dire exactement la même chose.", target: 'Actually, I was about to say the same thing.' },
  { id: 'opinion-3', contextId: 'opinion', langPackId: 'fr-en', source: 'Honnêtement, je trouve ça un peu exagéré.', target: "Honestly, I think that's a bit of a stretch." },
  { id: 'opinion-4', contextId: 'opinion', langPackId: 'fr-en', source: "Apparemment, ça ne s'est pas passé comme prévu.", target: "Apparently, it didn't go as planned." },
  { id: 'opinion-5', contextId: 'opinion', langPackId: 'fr-en', source: "Pour être tout à fait honnête, je n'y avais pas pensé.", target: "To be perfectly honest, I hadn't thought of that." },
  { id: 'opinion-6', contextId: 'opinion', langPackId: 'fr-en', source: "C'est plutôt bien vu, en fait.", target: "That's a fair point, actually." },
  { id: 'opinion-7', contextId: 'opinion', langPackId: 'fr-en', source: "Je dirais que c'est à peu près ça.", target: "I'd say that's roughly it." },
  { id: 'opinion-8', contextId: 'opinion', langPackId: 'fr-en', source: "Je ne suis pas vraiment d'accord, pour être franc.", target: "I don't really agree, to be honest." },
  { id: 'opinion-9', contextId: 'opinion', langPackId: 'fr-en', source: "C'est assez surprenant, je dois dire.", target: "It's rather surprising, I must say." },
  { id: 'opinion-10', contextId: 'opinion', langPackId: 'fr-en', source: 'On pourrait dire ça, oui.', target: 'You could put it that way, yes.' },
  { id: 'opinion-11', contextId: 'opinion', langPackId: 'fr-en', source: "Ce n'est pas faux, mais ça dépend du contexte.", target: "That's not wrong, but it depends on the context." },
  { id: 'opinion-12', contextId: 'opinion', langPackId: 'fr-en', source: "J'aurais tendance à penser le contraire.", target: "I'd tend to think the opposite." },
  { id: 'opinion-13', contextId: 'opinion', langPackId: 'fr-en', source: "Franchement, ça m'étonnerait.", target: 'Frankly, I doubt it.' },
  { id: 'opinion-14', contextId: 'opinion', langPackId: 'fr-en', source: "Disons que ce n'est pas idéal.", target: "Let's just say it's not ideal." }
]
