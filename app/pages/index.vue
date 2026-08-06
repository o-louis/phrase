<script setup lang="ts">
import { contexts } from '~/data/contexts'
import { phrases } from '~/data/phrases'

function phraseCount(contextId: string) {
  return phrases.filter(p => p.contextId === contextId).length
}
</script>

<template>
  <div class="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
    <NuxtLink
      v-for="context in contexts"
      :key="context.id"
      :to="`/context/${context.id}`"
      class="card p-6 flex flex-col items-start gap-3 hover:border-accent transition-colors"
    >
      <span :class="context.icon" class="inline-block text-3xl text-accent" />
      <span class="font-heading text-lg font-semibold">{{ context.label }}</span>
      <span class="text-sm text-muted">{{ phraseCount(context.id) }} phrases</span>
    </NuxtLink>
  </div>
</template>
