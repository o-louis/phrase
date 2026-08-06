import { contexts } from '~/data/contexts'
import { langPacks } from '~/data/langPacks'
import { phrases } from '~/data/phrases'

/** Everything the pages render is scoped to the language pack currently selected. */
export function useLangPack() {
  const store = useReviewStore()

  const langPack = computed(
    () => langPacks.find(pack => pack.id === store.langPackId) ?? langPacks[0]!
  )

  const packPhrases = computed(() => phrases.filter(p => p.langPackId === langPack.value.id))

  // A context only shows up once the active pack actually has phrases for it.
  const packContexts = computed(() =>
    contexts.filter(context => packPhrases.value.some(p => p.contextId === context.id))
  )

  function phrasesOf(contextId: string) {
    return packPhrases.value.filter(p => p.contextId === contextId)
  }

  return { langPack, langPacks, packPhrases, packContexts, phrasesOf }
}
