export type LeitnerBox = 1 | 2 | 3

/** Recognition reveals the answer; production asks the learner to write it. */
export type ReviewMode = 'recognition' | 'production'

export type ReviewState = {
  phraseId: string
  box: LeitnerBox
  lastSeen: string
}
