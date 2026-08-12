import { APP_NAME } from './app/constants/app'
import { contexts } from './app/data/contexts'

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
      { name: 'Space Grotesk', provider: 'google', weights: [400, 500, 600, 700] }
    ]
  },
  // Everything is static data and localStorage progress, so there is nothing to
  // render per-request: prerender every route instead of shipping a server.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/review', ...contexts.map(context => `/context/${context.id}`)]
    }
  },
  css: ['~/assets/css/main.css']
})
