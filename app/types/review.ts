export type LeitnerBox = 1 | 2 | 3 | 4

/**
 * How well an answer was produced. `approximate` covers a typo or an answer the
 * learner vouched for themselves: good enough to advance, but not to certify
 * mastery, which requires one answer matching the reference.
 */
export type ReviewOutcome = 'exact' | 'approximate' | 'failed'

/** Recognition reveals the answer; production asks the learner to write it. */
export type ReviewMode = 'recognition' | 'production'

/**
 * Progress is tracked per (phrase, mode): recognising a phrase and being able to
 * write it are different skills, so mastering one must not hide the other.
 */
export type ReviewState = {
  phraseId: string
  mode: ReviewMode
  box: LeitnerBox
  lastSeen: string
}
