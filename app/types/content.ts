export type LangPack = {
  id: string
  sourceLang: string
  targetLang: string
  /** BCP 47 tag used to pick the speech synthesis voice for the target language. */
  speechLocale: string
  /** Spelled out rather than assembled: French elision and gender don't derive from a language name. */
  title: string
  inputPlaceholder: string
  shortLabel: string
}

export type Context = {
  id: string
  label: string
  icon: string
}

export type Register = 'formal' | 'neutral' | 'casual'

export type Phrase = {
  id: string
  contextId: string
  langPackId: string
  source: string
  target: string
  register?: Register
}
