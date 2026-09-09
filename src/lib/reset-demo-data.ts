// Clears every bit of state this demo persists in the browser (session,
// scheduled shop deletion, hero carousel edits). Cart isn't included here
// since it's plain in-memory state — a page reload already clears it.
const DEMO_STORAGE_KEYS = [
  "litch-session",
  "litch-shop-delete-at",
  "litch-hero-slides",
  "litch-welcome-seen",
]

export function resetDemoData() {
  for (const key of DEMO_STORAGE_KEYS) {
    window.localStorage.removeItem(key)
  }
}