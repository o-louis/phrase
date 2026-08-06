// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@unocss/nuxt', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },
  css: ['~/assets/css/main.css']
})
