import { APP_NAME } from './app/constants/app'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: APP_NAME,
      meta: [
        {
          name: 'description',
          content: 'Apprendre les tournures qu\'on utilise vraiment, par situation plutôt que mot à mot.'
        }
      ]
    }
  },
  modules: ['@pinia/nuxt', '@unocss/nuxt', '@nuxtjs/color-mode', '@nuxt/fonts'],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },
  fonts: {
    families: [
      { name: 'Fraunces', provider: 'google', weights: [500, 600, 700] },
      { name: 'Plus Jakarta Sans', provider: 'google', weights: [400, 500, 600] }
    ]
  },
  css: ['~/assets/css/main.css']
})
