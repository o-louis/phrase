<script setup lang="ts">
const store = useReviewStore()
const { packPhrases, packContexts, phrasesOf } = useLangPack()

onMounted(() => store.load())

function dueCount(contextId: string) {
  return phrasesOf(contextId).filter(p => store.isDue(p.id)).length
}

function acquiredCount(contextId: string) {
  return phrasesOf(contextId).filter(p => store.isMastered(p.id)).length
}

const totalDue = computed(() => packPhrases.value.filter(p => store.isDue(p.id)).length)
</script>

<template>
  <div class="max-w-2xl mx-auto flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <ModeToggle />
      <p class="text-sm text-muted">
        La progression est suivie séparément pour chaque mode.
      </p>
    </div>

    <NuxtLink
      v-if="totalDue"
      to="/review"
      class="card p-5 flex items-center justify-between gap-4 hover:border-accent transition-colors"
    >
      <span class="flex items-center gap-3">
        <span class="inline-block i-ph-cards text-2xl text-accent" />
        <span class="flex flex-col">
          <span class="font-heading font-semibold">Session de révision</span>
          <span class="text-sm text-muted">
            {{ totalDue }} {{ totalDue > 1 ? 'phrases à réviser' : 'phrase à réviser' }}
          </span>
        </span>
      </span>
      <span class="inline-block i-ph-arrow-right text-xl text-muted" />
    </NuxtLink>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <NuxtLink
        v-for="context in packContexts"
        :key="context.id"
        :to="`/context/${context.id}`"
        class="card p-6 flex flex-col items-start gap-3 hover:border-accent transition-colors"
      >
        <span class="w-full flex items-start justify-between">
          <span :class="context.icon" class="inline-block text-3xl text-accent" />
          <span
            v-if="dueCount(context.id)"
            class="text-xs px-2 py-0.5 rounded-full bg-accent text-white"
          >
            {{ dueCount(context.id) }} à revoir
          </span>
        </span>
        <span class="font-heading text-lg font-semibold">{{ context.label }}</span>
        <span class="w-full flex flex-col gap-1.5">
          <span class="text-sm text-muted">
            {{ acquiredCount(context.id) }} / {{ phrasesOf(context.id).length }} acquises
          </span>
          <span class="h-1 rounded-full bg-border overflow-hidden">
            <span
              class="block h-full bg-mastered transition-all duration-300"
              :style="{ width: `${(acquiredCount(context.id) / phrasesOf(context.id).length) * 100}%` }"
            />
          </span>
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
