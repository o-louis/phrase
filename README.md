# Phrasé

Learn the phrases people actually say, grouped by situation rather than word by word.

**Live:** https://phrasee.netlify.app

Aimed at B2+ learners whose gap isn't grammar or vocabulary but fluency: knowing
*a* way to say something, yet not the natural one, fast enough for a real
conversation. Each card is a full contextual sentence, not an isolated word.

## How it works

- **Contexts** — phrases grouped by situation (asking for directions, on a call,
  hedging an opinion…), not by grammatical category.
- **Two review modes** — *recognition* reveals the answer, *production* asks you
  to type the target sentence. Production is the default: recognising a phrase
  doesn't mean you can produce it under pressure.
- **Leitner spaced repetition** — three boxes with 0/2/7-day intervals. A missed
  phrase returns later in the same session instead of ending it.
- **Answer checking** — case, punctuation and diacritics are ignored, and typos
  within two characters count as correct. A word-level diff highlights only what
  was actually missed. Accents are dropped deliberately: a French keyboard can't
  reasonably produce `á`, `ñ` or `¿`, and the exercise tests the language, not
  the keyboard.
- **Language packs** — French → English and French → Spanish, each with its own
  progress. Adding a pack means adding content, not changing code.

Progress is stored in `localStorage`; there is no backend and no account.

## Stack

Nuxt 4, TypeScript, Pinia, UnoCSS, `@nuxt/fonts`. Speech uses the browser's
built-in Web Speech API, so audio costs nothing and needs no network call.

## Development

Install dependencies:

```bash
pnpm install
```

Start the dev server on `http://localhost:3000`:

```bash
pnpm dev
```

## Build

The site is fully prerendered — there is no server runtime, so `pnpm generate`
is the build, not `pnpm build`. Every route is listed in `nitro.prerender.routes`
in `nuxt.config.ts`, including one per context.

```bash
pnpm generate
```

Serve the generated output locally to check it before deploying:

```bash
npx serve dist
```

Worth doing: prerendering exposes bugs the dev server hides. Anything reading
`useRoute().query` on mount must wait for `router.isReady()` first, or the query
string won't be parsed yet on a prerendered page.

## Deployment

Netlify, configured in `netlify.toml`: `pnpm generate` with `dist` as the publish
directory. `dist` is a symlink to `.output/public` — publish `dist`, not the
real path, because Netlify skips dot-prefixed directories and would deploy nothing.

## Adding content

Phrases live in `app/data/phrases/<langPackId>/<context>.ts`. Add entries there,
register any new context in `app/data/contexts.ts`, and a new language pack in
`app/data/langPacks.ts`. Phrase ids must be unique across every pack.
