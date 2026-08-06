export function useSpeech() {
  function speak(text: string, lang = 'en-US') {
    if (!import.meta.client || !('speechSynthesis' in window)) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  return { speak }
}
