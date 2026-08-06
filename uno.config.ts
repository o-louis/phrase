import { defineConfig, presetIcons, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons()
  ],
  theme: {
    colors: {
      bg: 'var(--color-bg)',
      surface: 'var(--color-surface)',
      border: 'var(--color-border)',
      text: 'var(--color-text)',
      muted: 'var(--color-muted)',
      accent: 'var(--color-accent)',
      'accent-hover': 'var(--color-accent-hover)'
    }
  },
  shortcuts: {
    card: 'bg-surface border border-border rounded-xl'
  }
})
