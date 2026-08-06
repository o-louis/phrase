<script setup lang="ts">
import { contexts } from '~/data/contexts'
import { phrases } from '~/data/phrases'
import type { Phrase } from '~/types/content'

const route = useRoute()
const store = useReviewStore()
const { speak } = useSpeech()

const contextId = computed(() => route.query.context as string | undefined)
const context = computed(() => contexts.find(c => c.id === contextId.value))

const mounted = ref(false)
const queue = ref<Phrase[]>([])
const total = ref(0)
const done = ref(0)
const revealed = ref(false)

const current = computed(() => queue.value[0])
const progress = computed(() => (total.value ? (done.value / total.value) * 100 : 0))

function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j]!, result[i]!]
  }
  return result
}

function reveal() {
  if (revealed.value || !current.value) return
  revealed.value = true
  speak(current.value.target)
}

function answer(known: boolean) {
  const phrase = current.value
  if (!phrase || !revealed.value) return

  store.grade(phrase.id, known)
  queue.value.shift()
  // A missed phrase comes back later in the same session instead of ending it.
  if (known) done.value++
  else queue.value.push(phrase)
  revealed.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    revealed.value ? answer(true) : reveal()
  }
  else if (event.key === '1' && revealed.value) answer(false)
  else if (event.key === '2' && revealed.value) answer(true)
}

onMounted(() => {
  store.load()
  const pool = phrases.filter(
    p => (!contextId.value || p.contextId === contextId.value) && store.isDue(p.id)
  )
  queue.value = shuffle(pool)
  total.value = pool.length
  mounted.value = true
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="max-w-2xl mx-auto flex flex-col gap-6">
    <NuxtLink
      :to="contextId ? `/context/${contextId}` : '/'"
      class="text-muted hover:text-accent w-fit flex items-center gap-1"
    >
      <span class="inline-block i-ph-arrow-left" /> Back
    </NuxtLink>

    <div v-if="mounted && total" class="flex flex-col gap-2">
      <div class="flex items-center justify-between text-sm text-muted">
        <span>{{ context ? context.label : 'All contexts' }}</span>
        <span>{{ done }} / {{ total }}</span>
      </div>
      <div class="h-1.5 rounded-full bg-border overflow-hidden">
        <div
          class="h-full bg-accent transition-all duration-300"
          :style="{ width: `${progress}%` }"
        />
      </div>
    </div>

    <!-- Active card -->
    <div v-if="current" class="card p-8 flex flex-col gap-6 min-h-64">
      <p class="font-heading text-2xl leading-snug">
        {{ current.source }}
      </p>

      <div v-if="revealed" class="flex items-start justify-between gap-3 pt-4 border-t border-border">
        <p class="text-xl text-accent font-medium leading-snug">
          {{ current.target }}
        </p>
        <button
          class="shrink-0 p-2 rounded-full hover:bg-bg transition-colors"
          aria-label="Play pronunciation"
          @click="speak(current.target)"
        >
          <span class="inline-block i-ph-speaker-high text-xl" />
        </button>
      </div>

      <div class="mt-auto">
        <button
          v-if="!revealed"
          class="w-full py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover transition-colors"
          @click="reveal"
        >
          Show answer
        </button>
        <div v-else class="grid grid-cols-2 gap-3">
          <button
            class="py-3 rounded-lg border border-border hover:border-accent transition-colors"
            @click="answer(false)"
          >
            Didn't know
          </button>
          <button
            class="py-3 rounded-lg bg-box-3 text-white font-medium hover:opacity-90 transition-opacity"
            @click="answer(true)"
          >
            Knew it
          </button>
        </div>
      </div>
    </div>

    <!-- Session finished -->
    <div v-else-if="mounted && total" class="card p-8 flex flex-col items-center gap-3 text-center">
      <span class="inline-block i-ph-check-circle text-4xl text-box-3" />
      <p class="font-heading text-xl">
        Session complete
      </p>
      <p class="text-muted">
        {{ total }} {{ total > 1 ? 'phrases' : 'phrase' }} reviewed.
      </p>
      <NuxtLink to="/" class="mt-2 px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors">
        Back to contexts
      </NuxtLink>
    </div>

    <!-- Nothing due -->
    <div v-else-if="mounted" class="card p-8 flex flex-col items-center gap-3 text-center">
      <span class="inline-block i-ph-coffee text-4xl text-muted" />
      <p class="font-heading text-xl">
        All caught up
      </p>
      <p class="text-muted">
        Nothing to review right now. Come back later.
      </p>
    </div>

    <p v-if="current" class="text-center text-xs text-muted">
      Space to reveal · 1 didn't know · 2 knew it
    </p>
  </div>
</template>
