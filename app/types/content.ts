export type LangPack = {
  id: string
  sourceLang: string
  targetLang: string
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
