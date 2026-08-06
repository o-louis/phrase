<script setup lang="ts">
const colorMode = useColorMode()

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="min-h-screen bg-bg text-text">
    <NuxtRouteAnnouncer />
    <header class="max-w-2xl mx-auto flex items-center justify-between px-4 py-6">
      <NuxtLink to="/" class="font-heading text-xl font-semibold">
        Learn English
      </NuxtLink>
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
    </header>
    <main class="px-4 pb-12">
      <NuxtPage />
    </main>
  </div>
</template>
