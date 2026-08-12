<script setup lang="ts">
import { contexts } from '~/data/contexts'

const route = useRoute()
const store = useReviewStore()
const { speak } = useSpeech()
const { langPack, phrasesOf } = useLangPack()

const contextId = route.params.id as string
const context = computed(() => contexts.find(c => c.id === contextId))
const contextPhrases = computed(() => phrasesOf(contextId))
const dueCount = computed(() => contextPhrases.value.filter(p => store.isDue(p.id)).length)

const revealed = reactive<Record<string, boolean>>({})

function toggleReveal(id: string) {
  revealed[id] = !revealed[id]
}

// Left border tracks how well the phrase is known; neutral until it has been reviewed once.
function boxClass(phraseId: string) {
  if (!store.stateOf(phraseId)) return 'border-l-border'
  const box = store.boxOf(phraseId)
  if (box === 4) return 'border-l-mastered'
  if (box === 3) return 'border-l-familiar'
  if (box === 2) return 'border-l-learning'
  return 'border-l-accent'
}

onMounted(() => store.load())
</script>

<template>
  <div class="max-w-2xl mx-auto flex flex-col gap-4">
    <NuxtLink to="/" class="text-muted hover:text-accent w-fit flex items-center gap-1">
      <span class="inline-block i-ph-arrow-left" /> Retour
    </NuxtLink>

    <h1 class="font-heading text-2xl font-semibold flex items-center gap-2">
      <span :class="context?.icon" class="inline-block text-accent" />
      {{ context?.label }}
    </h1>

    <div class="flex flex-wrap items-center justify-between gap-3">
      <!-- Counts and card colours are mode-scoped; the mode itself is set on the home page. -->
      <span class="text-sm text-muted">
        Mode {{ store.mode === 'production' ? 'écriture' : 'reconnaissance' }}
      </span>
      <NuxtLink
        v-if="dueCount"
        :to="`/review?context=${contextId}`"
        class="shrink-0 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors"
      >
        Réviser {{ dueCount }}
      </NuxtLink>
    </div>

    <div
      v-for="phrase in contextPhrases"
      :key="phrase.id"
      class="card border-l-4 p-5 cursor-pointer"
      :class="boxClass(phrase.id)"
      @click="toggleReveal(phrase.id)"
    >
      <p class="text-lg">
        {{ phrase.source }}
      </p>
      <div
        v-if="revealed[phrase.id]"
        class="mt-3 pt-3 border-t border-border flex items-center justify-between gap-3"
      >
        <p class="text-accent font-medium">
          {{ phrase.target }}
        </p>
        <button
          class="shrink-0 p-2 rounded-full hover:bg-bg transition-colors"
          aria-label="Écouter la prononciation"
          @click.stop="speak(phrase.target, langPack.speechLocale)"
        >
          <span class="inline-block i-ph-speaker-high text-xl" />
        </button>
      </div>
    </div>
  </div>
</template>
