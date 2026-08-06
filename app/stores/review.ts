import { defineStore } from 'pinia'
import type { LeitnerBox, ReviewMode, ReviewState } from '~/types/review'

const STORAGE_KEY = 'learn-english:review'
const MODE_KEY = 'learn-english:mode'

// Days a phrase rests in each box before it comes up for review again.
const INTERVALS: Record<LeitnerBox, number> = { 1: 0, 2: 2, 3: 7 }

const DAY_MS = 86_400_000

export const useReviewStore = defineStore('review', () => {
  const states = ref<Record<string, ReviewState>>({})
  const mode = ref<ReviewMode>('production')
  const loaded = ref(false)

  function load() {
    if (!import.meta.client || loaded.value) return
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        states.value = JSON.parse(raw)
      }
      catch {
        states.value = {}
      }
    }
    const storedMode = localStorage.getItem(MODE_KEY)
    if (storedMode === 'recognition' || storedMode === 'production') mode.value = storedMode
    loaded.value = true
  }

  function setMode(next: ReviewMode) {
    mode.value = next
    if (import.meta.client) localStorage.setItem(MODE_KEY, next)
  }

  function persist() {
    if (!import.meta.client) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(states.value))
  }

  function boxOf(phraseId: string): LeitnerBox {
    return states.value[phraseId]?.box ?? 1
  }

  function isDue(phraseId: string, now = Date.now()): boolean {
    const state = states.value[phraseId]
    if (!state) return true
    const elapsedDays = (now - new Date(state.lastSeen).getTime()) / DAY_MS
    return elapsedDays >= INTERVALS[state.box]
  }

  function grade(phraseId: string, known: boolean) {
    const current = boxOf(phraseId)
    const box = known ? (Math.min(current + 1, 3) as LeitnerBox) : 1
    states.value[phraseId] = { phraseId, box, lastSeen: new Date().toISOString() }
    persist()
  }

  function reset() {
    states.value = {}
    persist()
  }

  return { states, mode, loaded, load, setMode, boxOf, isDue, grade, reset }
})
