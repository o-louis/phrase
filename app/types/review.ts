export type LeitnerBox = 1 | 2 | 3

export type ReviewState = {
  phraseId: string
  box: LeitnerBox
  lastSeen: string
}
