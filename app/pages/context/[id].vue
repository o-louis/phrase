<script setup lang="ts">
import { contexts } from '~/data/contexts'
import { phrases } from '~/data/phrases'

const route = useRoute()
const contextId = route.params.id as string

const context = computed(() => contexts.find(c => c.id === contextId))
const contextPhrases = computed(() => phrases.filter(p => p.contextId === contextId))

const revealed = reactive<Record<string, boolean>>({})

function toggleReveal(id: string) {
  revealed[id] = !revealed[id]
}

const { speak } = useSpeech()
</script>

<template>
  <div class="max-w-2xl mx-auto flex flex-col gap-4">
    <NuxtLink to="/" class="text-muted hover:text-accent w-fit flex items-center gap-1">
      <span class="inline-block i-ph-arrow-left" /> Back
    </NuxtLink>

    <h1 class="font-heading text-2xl font-semibold flex items-center gap-2">
      <span :class="context?.icon" class="inline-block text-accent" />
      {{ context?.label }}
    </h1>

    <div
      v-for="phrase in contextPhrases"
      :key="phrase.id"
      class="card p-5 cursor-pointer"
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
          aria-label="Play pronunciation"
          @click.stop="speak(phrase.target)"
        >
          <span class="inline-block i-ph-speaker-high text-xl" />
        </button>
      </div>
    </div>
  </div>
</template>
