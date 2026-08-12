<script setup lang="ts">
import { contexts } from '~/data/contexts'
import type { Phrase } from '~/types/content'
import type { ReviewOutcome } from '~/types/review'
import type { AnswerCheck } from '~/utils/answer'

const route = useRoute()
const router = useRouter()
const store = useReviewStore()
const { speak } = useSpeech()
const { langPack, packPhrases } = useLangPack()

const contextId = computed(() => route.query.context as string | undefined)
const context = computed(() => contexts.find(c => c.id === contextId.value))

const mounted = ref(false)
const queue = ref<Phrase[]>([])
const total = ref(0)
const done = ref(0)

const input = ref('')
const result = ref<AnswerCheck | null>(null)
const revealed = ref(false)
const inputEl = ref<HTMLInputElement | null>(null)

const current = computed(() => queue.value[0])
const progress = computed(() => (total.value ? (done.value / total.value) * 100 : 0))
const answered = computed(() => revealed.value || result.value !== null)

// A typo advances the phrase but won't certify it as mastered; only an answer
// matching the reference does.
const producedOutcome = computed<ReviewOutcome>(() => {
  if (result.value?.status === 'correct') return 'exact'
  if (result.value?.status === 'almost') return 'approximate'
  return 'failed'
})
const gradedAsKnown = computed(() => producedOutcome.value !== 'failed')

function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j]!, result[i]!]
  }
  return result
}

function focusInput() {
  nextTick(() => inputEl.value?.focus())
}

/** Each mode has its own due phrases, so switching starts a fresh session. */
function startSession() {
  const pool = packPhrases.value.filter(
    p => (!contextId.value || p.contextId === contextId.value) && store.isDue(p.id)
  )
  queue.value = shuffle(pool)
  total.value = pool.length
  done.value = 0
  resetCard()
}

function resetCard() {
  input.value = ''
  result.value = null
  revealed.value = false
  if (store.mode === 'production') focusInput()
}

function reveal() {
  if (answered.value || !current.value) return
  revealed.value = true
  speak(current.value.target, langPack.value.speechLocale)
}

function submit() {
  if (answered.value || !current.value) return
  result.value = checkAnswer(input.value, current.value.target)
  speak(current.value.target, langPack.value.speechLocale)
}

/** Gives up on the current phrase: shows the answer and counts it as not known. */
function giveUp() {
  if (answered.value || !current.value) return
  input.value = ''
  result.value = checkAnswer('', current.value.target)
  speak(current.value.target, langPack.value.speechLocale)
}

function answer(outcome: ReviewOutcome) {
  const phrase = current.value
  if (!phrase || !answered.value) return

  store.grade(phrase.id, outcome)
  queue.value.shift()
  // A missed phrase comes back later in the same session instead of ending it.
  if (outcome === 'failed') queue.value.push(phrase)
  else done.value++
  resetCard()
}

function onKeydown(event: KeyboardEvent) {
  const target = event.target as HTMLElement | null
  if (target?.tagName === 'INPUT') return

  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    // Recognition is self-graded, so "I knew it" is the strongest signal it can give.
    if (answered.value) answer(store.mode === 'production' ? producedOutcome.value : 'exact')
    else if (store.mode === 'recognition') reveal()
    else focusInput()
  }
  else if (event.key === '1' && answered.value) answer('failed')
  else if (event.key === '2' && answered.value) {
    answer(store.mode === 'production' ? 'approximate' : 'exact')
  }
}

onMounted(async () => {
  // On a prerendered page the query string isn't parsed yet when the component
  // mounts, so `?context=` would be missed and the session would span every context.
  await router.isReady()

  store.load()
  startSession()
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
      <span class="inline-block i-ph-arrow-left" /> Retour
    </NuxtLink>

    <div v-if="mounted && total" class="flex flex-col gap-2">
      <div class="flex items-center justify-between gap-3 text-sm text-muted">
        <span>
          {{ context ? context.label : 'Tous les contextes' }}
          <span class="opacity-60">·</span>
          {{ store.mode === 'production' ? 'Écriture' : 'Reconnaissance' }}
        </span>
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

      <!-- Production: write the phrase -->
      <form v-if="store.mode === 'production' && !answered" class="flex flex-col gap-3" @submit.prevent="submit">
        <input
          ref="inputEl"
          v-model="input"
          type="text"
          autocomplete="off"
          autocapitalize="off"
          autocorrect="off"
          spellcheck="false"
          :placeholder="langPack.inputPlaceholder"
          class="w-full px-4 py-3 rounded-lg bg-bg border border-border focus:border-accent outline-none transition-colors"
        >
        <div class="flex gap-3">
          <button
            type="button"
            class="px-4 py-3 rounded-lg border border-border text-muted hover:border-accent hover:text-text transition-colors"
            @click="giveUp"
          >
            Je ne sais pas
          </button>
          <button
            type="submit"
            class="flex-1 py-3 rounded-lg bg-accent-solid text-on-accent font-medium hover:bg-accent-hover transition-colors"
          >
            Valider
          </button>
        </div>
      </form>

      <!-- Answer, with the words that were missed highlighted -->
      <div v-if="answered" class="flex flex-col gap-4 pt-4 border-t border-border">
        <div v-if="result" class="flex items-center gap-2 text-sm font-medium">
          <span
            :class="[
              result.status === 'correct' ? 'i-ph-check-circle text-mastered' : '',
              result.status === 'almost' ? 'i-ph-warning-circle text-learning' : '',
              result.status === 'incorrect' ? 'i-ph-x-circle text-muted' : ''
            ]"
            class="inline-block text-lg"
          />
          <span
            :class="{
              'text-mastered': result.status === 'correct',
              'text-learning': result.status === 'almost',
              'text-muted': result.status === 'incorrect'
            }"
          >
            {{ result.status === 'correct' ? 'Correct' : result.status === 'almost' ? 'Presque — une faute de frappe' : 'La bonne réponse' }}
          </span>
        </div>

        <div class="flex items-start justify-between gap-3">
          <p class="text-xl font-medium leading-snug">
            <template v-if="result">
              <span
                v-for="(entry, index) in result.words"
                :key="index"
                :class="entry.matched ? '' : 'text-accent underline decoration-wavy underline-offset-4'"
              >{{ entry.word }}{{ index < result.words.length - 1 ? ' ' : '' }}</span>
            </template>
            <span v-else class="text-accent">{{ current.target }}</span>
          </p>
          <button
            class="shrink-0 p-2 rounded-full hover:bg-bg transition-colors"
            aria-label="Écouter la prononciation"
            @click="speak(current.target, langPack.speechLocale)"
          >
            <span class="inline-block i-ph-speaker-high text-xl" />
          </button>
        </div>
      </div>

      <div class="mt-auto">
        <button
          v-if="store.mode === 'recognition' && !answered"
          class="w-full py-3 rounded-lg bg-accent-solid text-on-accent font-medium hover:bg-accent-hover transition-colors"
          @click="reveal"
        >
          Voir la réponse
        </button>

        <!-- Recognition grades itself; production already knows, but lets a valid variant be kept. -->
        <div v-else-if="answered && store.mode === 'recognition'" class="grid grid-cols-2 gap-3">
          <button
            class="py-3 rounded-lg border border-border hover:border-accent transition-colors"
            @click="answer('failed')"
          >
            Je ne savais pas
          </button>
          <button
            class="py-3 rounded-lg bg-mastered text-on-mastered font-medium hover:opacity-90 transition-opacity"
            @click="answer('exact')"
          >
            Je savais
          </button>
        </div>

        <div v-else-if="answered" class="flex gap-3">
          <button
            v-if="!gradedAsKnown"
            class="px-4 py-3 rounded-lg border border-border text-muted hover:border-accent hover:text-text transition-colors"
            @click="answer('approximate')"
          >
            Compter comme correct
          </button>
          <button
            class="flex-1 py-3 rounded-lg bg-accent-solid text-on-accent font-medium hover:bg-accent-hover transition-colors"
            @click="answer(producedOutcome)"
          >
            Continuer
          </button>
        </div>
      </div>
    </div>

    <!-- Session finished -->
    <div v-else-if="mounted && total" class="card p-8 flex flex-col items-center gap-3 text-center">
      <span class="inline-block i-ph-check-circle text-4xl text-mastered" />
      <p class="font-heading text-xl">
        Session terminée
      </p>
      <p class="text-muted">
        {{ total }} {{ total > 1 ? 'phrases révisées' : 'phrase révisée' }}.
      </p>
      <NuxtLink to="/" class="mt-2 px-4 py-2 rounded-lg bg-accent-solid text-on-accent hover:bg-accent-hover transition-colors">
        Retour aux contextes
      </NuxtLink>
    </div>

    <!-- Nothing due -->
    <div v-else-if="mounted" class="card p-8 flex flex-col items-center gap-3 text-center">
      <span class="inline-block i-ph-coffee text-4xl text-muted" />
      <p class="font-heading text-xl">
        Tout est à jour
      </p>
      <p class="text-muted">
        Rien à réviser pour le moment. Reviens plus tard.
      </p>
    </div>

    <p v-if="current" class="text-center text-xs text-muted">
      <template v-if="store.mode === 'production'">
        Entrée pour valider{{ answered ? ' · Entrée pour continuer' : '' }}
      </template>
      <template v-else>
        Espace pour révéler · 1 je ne savais pas · 2 je savais
      </template>
    </p>
  </div>
</template>
