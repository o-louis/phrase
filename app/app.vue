<script setup lang="ts">
const colorMode = useColorMode()

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="min-h-screen bg-bg text-text flex flex-col items-center justify-center gap-4">
    <NuxtRouteAnnouncer />
    <h1 class="text-3xl font-semibold">Learn English</h1>
    <p class="text-muted">Scaffold check: Nuxt + Pinia + UnoCSS + color mode</p>
    <button
      class="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors"
      @click="toggleColorMode"
    >
      Toggle {{ colorMode.value === 'dark' ? 'light' : 'dark' }} mode
    </button>
  </div>
</template>
