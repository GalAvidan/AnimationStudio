/**
 * speakNarration — fire-and-forget browser TTS for webspeech engine preview.
 *
 * Cancels any in-progress utterance from a previous scene, then speaks the
 * new text concurrently with the animation (non-blocking).
 *
 * Rate and language are pulled from audio/plan.json defaults; adjust below if
 * you change plan.json.
 */

const RATE = 0.9;
const LANG = "en-US";

export function speakNarration(text: string): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = RATE;
  utterance.lang = LANG;
  window.speechSynthesis.speak(utterance);
}

export function stopNarration(): void {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
