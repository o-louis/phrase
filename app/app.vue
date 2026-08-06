<script setup lang="ts">
import { APP_NAME } from '~/constants/app'

const colorMode = useColorMode()
const store = useReviewStore()
const { langPack, langPacks } = useLangPack()

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

onMounted(() => store.load())
</script>

<template>
  <div class="min-h-screen bg-bg text-text">
    <NuxtRouteAnnouncer />
    <header class="max-w-2xl mx-auto flex items-center justify-between gap-4 px-4 py-6">
      <NuxtLink to="/" class="font-heading text-xl font-semibold">
        {{ APP_NAME }}
      </NuxtLink>

      <div class="flex items-center gap-2">
        <div class="flex rounded-lg border border-border p-0.5 text-sm">
          <button
            v-for="pack in langPacks"
            :key="pack.id"
            class="px-2.5 py-1 rounded-md transition-colors"
            :class="langPack.id === pack.id ? 'bg-accent text-white' : 'text-muted hover:text-text'"
            :aria-label="pack.title"
            @click="store.setLangPack(pack.id)"
          >
            {{ pack.shortLabel }}
          </button>
        </div>

        <ClientOnly>
          <button
            class="p-2 rounded-full hover:bg-surface transition-colors"
            aria-label="Changer de thème"
            @click="toggleColorMode"
          >
            <span :class="colorMode.value === 'dark' ? 'i-ph-sun' : 'i-ph-moon'" class="inline-block text-xl" />
          </button>
          <template #fallback>
            <div class="w-9 h-9" />
          </template>
        </ClientOnly>
      </div>
    </header>
    <main class="px-4 pb-12">
      <NuxtPage />
    </main>
  </div>
</template>
