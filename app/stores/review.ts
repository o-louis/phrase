import { defineStore } from 'pinia'
import { defaultLangPackId, langPacks } from '~/data/langPacks'
import type { LeitnerBox, ReviewMode, ReviewState } from '~/types/review'

const STORAGE_KEY = 'learn-english:review'
const MODE_KEY = 'learn-english:mode'
const LANG_PACK_KEY = 'learn-english:langPack'

// Days a phrase rests in each box before it comes up for review again.
const INTERVALS: Record<LeitnerBox, number> = { 1: 0, 2: 2, 3: 7 }

const DAY_MS = 86_400_000

/** Progress is per (phrase, mode), so the two skills advance independently. */
function stateKey(phraseId: string, mode: ReviewMode) {
  return `${phraseId}:${mode}`
}

export const useReviewStore = defineStore('review', () => {
  const states = ref<Record<string, ReviewState>>({})
  const mode = ref<ReviewMode>('production')
  const langPackId = ref(defaultLangPackId)
  const loaded = ref(false)

  /**
   * Entries saved before progress was split per mode have no mode of their own.
   * They are credited to recognition only: we know some review happened but not
   * which kind, and under-crediting costs an extra review, whereas over-crediting
   * would silently lock the learner out of writing practice.
   */
  function migrateLegacyStates(stored: Record<string, ReviewState>) {
    const migrated: Record<string, ReviewState> = {}
    for (const [key, state] of Object.entries(stored)) {
      if (state.mode) {
        migrated[key] = state
        continue
      }
      migrated[stateKey(state.phraseId, 'recognition')] = { ...state, mode: 'recognition' }
    }
    return migrated
  }

  function load() {
    if (!import.meta.client || loaded.value) return
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        states.value = migrateLegacyStates(JSON.parse(raw))
      }
      catch {
        states.value = {}
      }
    }
    const storedMode = localStorage.getItem(MODE_KEY)
    if (storedMode === 'recognition' || storedMode === 'production') mode.value = storedMode

    const storedPack = localStorage.getItem(LANG_PACK_KEY)
    if (storedPack && langPacks.some(pack => pack.id === storedPack)) langPackId.value = storedPack

    loaded.value = true
    persist()
  }

  function setMode(next: ReviewMode) {
    mode.value = next
    if (import.meta.client) localStorage.setItem(MODE_KEY, next)
  }

  function setLangPack(next: string) {
    langPackId.value = next
    if (import.meta.client) localStorage.setItem(LANG_PACK_KEY, next)
  }

  function persist() {
    if (!import.meta.client) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(states.value))
  }

  function stateOf(phraseId: string, forMode: ReviewMode = mode.value) {
    return states.value[stateKey(phraseId, forMode)]
  }

  function boxOf(phraseId: string, forMode: ReviewMode = mode.value): LeitnerBox {
    return stateOf(phraseId, forMode)?.box ?? 1
  }

  function isDue(phraseId: string, forMode: ReviewMode = mode.value, now = Date.now()): boolean {
    const state = stateOf(phraseId, forMode)
    if (!state) return true
    const elapsedDays = (now - new Date(state.lastSeen).getTime()) / DAY_MS
    return elapsedDays >= INTERVALS[state.box]
  }

  function grade(phraseId: string, known: boolean, forMode: ReviewMode = mode.value) {
    const box = known ? (Math.min(boxOf(phraseId, forMode) + 1, 3) as LeitnerBox) : 1
    states.value[stateKey(phraseId, forMode)] = {
      phraseId,
      mode: forMode,
      box,
      lastSeen: new Date().toISOString()
    }
    persist()
  }

  function reset() {
    states.value = {}
    persist()
  }

  return {
    states,
    mode,
    langPackId,
    loaded,
    load,
    setMode,
    setLangPack,
    stateOf,
    boxOf,
    isDue,
    grade,
    reset
  }
})
