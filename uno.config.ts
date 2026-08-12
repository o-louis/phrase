import { defineConfig, presetIcons, presetWind3 } from 'unocss'
import { contexts } from './app/data/contexts'

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons()
  ],
  safelist: contexts.map(context => context.icon),
  theme: {
    colors: {
      bg: 'var(--color-bg)',
      surface: 'var(--color-surface)',
      border: 'var(--color-border)',
      text: 'var(--color-text)',
      muted: 'var(--color-muted)',
      accent: 'var(--color-accent)',
      'accent-solid': 'var(--color-accent-solid)',
      'accent-hover': 'var(--color-accent-hover)',
      'on-accent': 'var(--color-on-accent)',
      'on-mastered': 'var(--color-on-mastered)',
      learning: 'var(--color-learning)',
      familiar: 'var(--color-familiar)',
      mastered: 'var(--color-mastered)'
    },
    // Riso wants corners that read as cut, not moulded. Overriding the scale
    // keeps the existing `rounded-*` classes in place; `rounded-full` is
    // untouched so pills and badges stay round.
    borderRadius: {
      DEFAULT: '2px',
      sm: '2px',
      md: '3px',
      lg: '4px',
      xl: '4px',
      '2xl': '6px',
      '3xl': '8px'
    }
  },
  shortcuts: {
    card: 'bg-surface border border-border rounded-xl'
  }
})
