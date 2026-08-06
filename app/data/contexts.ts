import type { Context } from '~/types/content'

export const contexts: Context[] = [
  { id: 'directions', label: 'Demander son chemin', icon: 'i-ph-signpost' },
  { id: 'restaurant', label: 'Au restaurant', icon: 'i-ph-fork-knife' },
  { id: 'small-talk', label: 'Conversation informelle', icon: 'i-ph-chats-circle' },
  { id: 'meeting', label: 'En réunion', icon: 'i-ph-presentation-chart' },
  { id: 'opinion', label: 'Nuancer et donner son avis', icon: 'i-ph-scales' },
  { id: 'phone', label: 'Au téléphone et en visio', icon: 'i-ph-phone-call' },
  { id: 'travel', label: 'Voyage', icon: 'i-ph-airplane-takeoff' },
  { id: 'shopping', label: 'Achats et services', icon: 'i-ph-shopping-bag' }
]
