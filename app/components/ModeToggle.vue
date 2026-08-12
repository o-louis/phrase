<script setup lang="ts">
import type { ReviewMode } from '~/types/review'

const store = useReviewStore()

const options: { value: ReviewMode, label: string }[] = [
  { value: 'production', label: 'Écriture' },
  { value: 'recognition', label: 'Reconnaissance' }
]
</script>

<template>
  <div class="w-fit flex rounded-lg border border-border p-0.5 text-sm">
    <button
      v-for="option in options"
      :key="option.value"
      class="px-3 py-1 rounded-md transition-colors"
      :class="store.mode === option.value ? 'bg-accent-solid text-on-accent' : 'text-muted hover:text-text'"
      @click="store.setMode(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
