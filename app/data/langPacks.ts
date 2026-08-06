import type { LangPack } from '~/types/content'

export const langPacks: LangPack[] = [
  {
    id: 'fr-en',
    sourceLang: 'fr',
    targetLang: 'en',
    speechLocale: 'en-US',
    title: "Apprendre l'anglais",
    inputPlaceholder: 'Écris la phrase en anglais…',
    shortLabel: 'EN'
  },
  {
    id: 'fr-es',
    sourceLang: 'fr',
    targetLang: 'es',
    speechLocale: 'es-ES',
    title: "Apprendre l'espagnol",
    inputPlaceholder: 'Écris la phrase en espagnol…',
    shortLabel: 'ES'
  }
]

export const defaultLangPackId = 'fr-en'
