export type AnswerStatus = 'correct' | 'almost' | 'incorrect'

export type WordMatch = {
  word: string
  matched: boolean
}

export type AnswerCheck = {
  status: AnswerStatus
  words: WordMatch[]
}

// How many character edits still count as a typo rather than a wrong answer.
const TYPO_TOLERANCE = 2

/**
 * Case, punctuation and diacritics shouldn't decide whether an answer counts.
 * Accents and inverted marks are dropped because a French keyboard can't
 * reasonably produce á, í, ñ or ¿ — that would test the keyboard, not the
 * language. The answer is still displayed with its correct spelling.
 * Apostrophes are kept: they distinguish real words in English.
 */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,!?¿¡;:"«»…]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function levenshtein(a: string, b: string): number {
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)

  for (let i = 1; i <= a.length; i++) {
    const curr = [i]
    for (let j = 1; j <= b.length; j++) {
      curr[j] = Math.min(
        prev[j]! + 1,
        curr[j - 1]! + 1,
        prev[j - 1]! + (a[i - 1] === b[j - 1] ? 0 : 1)
      )
    }
    prev = curr
  }

  return prev[b.length]!
}

/**
 * Marks which expected words the answer contains, aligned by longest common
 * subsequence so a missing word doesn't invalidate everything after it.
 */
function matchExpectedWords(input: string[], expected: string[]): boolean[] {
  const table: number[][] = Array.from(
    { length: input.length + 1 },
    () => new Array(expected.length + 1).fill(0)
  )

  for (let i = input.length - 1; i >= 0; i--) {
    for (let j = expected.length - 1; j >= 0; j--) {
      table[i]![j] = input[i] === expected[j]
        ? table[i + 1]![j + 1]! + 1
        : Math.max(table[i + 1]![j]!, table[i]![j + 1]!)
    }
  }

  const matched = new Array<boolean>(expected.length).fill(false)
  let i = 0
  let j = 0

  while (i < input.length && j < expected.length) {
    if (input[i] === expected[j]) {
      matched[j] = true
      i++
      j++
    }
    else if (table[i + 1]![j]! >= table[i]![j + 1]!) i++
    else j++
  }

  return matched
}

export function checkAnswer(input: string, expected: string): AnswerCheck {
  const normalizedInput = normalize(input)
  const normalizedExpected = normalize(expected)

  let status: AnswerStatus = 'incorrect'
  if (normalizedInput && normalizedInput === normalizedExpected) status = 'correct'
  else if (normalizedInput && levenshtein(normalizedInput, normalizedExpected) <= TYPO_TOLERANCE) status = 'almost'

  const matched = matchExpectedWords(
    normalizedInput.split(' ').filter(Boolean),
    normalizedExpected.split(' ').filter(Boolean)
  )

  return {
    status,
    words: expected.split(/\s+/).filter(Boolean).map((word, index) => ({
      word,
      matched: matched[index] ?? false
    }))
  }
}
