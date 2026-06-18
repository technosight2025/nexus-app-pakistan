/* =====================================================
   NEXUS Storage Utility — LocalStorage CRUD
   Simple key/value wrapper used by all components
   ===================================================== */

const PREFIX = 'nexus_';

/**
 * Get a value from localStorage by key
 */
export function getStorage(key) {
  try {
    const val = localStorage.getItem(PREFIX + key);
    return val ? JSON.parse(val) : null;
  } catch {
    return null;
  }
}

/**
 * Save a value to localStorage by key
 */
export function setStorage(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.warn('[NEXUS Storage] Could not save:', key, e);
  }
}

/**
 * Delete a key from localStorage
 */
export function removeStorage(key) {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {}
}

/**
 * Clear ALL nexus_ keys
 */
export function clearStorage() {
  Object.keys(localStorage)
    .filter(k => k.startsWith(PREFIX))
    .forEach(k => localStorage.removeItem(k));
}

// ── Legacy compat API (for any old code) ──────────────
export const storage = {
  getLeads:      ()      => getStorage('leads'),
  saveLeads:     (v)     => setStorage('leads', v),
  getQuotes:     ()      => getStorage('quotes'),
  saveQuote:     (q)     => {
    const quotes = getStorage('quotes') || [];
    quotes.unshift(q);
    setStorage('quotes', quotes);
  },
  getScreens:    ()      => getStorage('screens'),
  saveScreens:   (v)     => setStorage('screens', v),
  getPlaylists:  ()      => getStorage('playlists'),
  savePlaylists: (v)     => setStorage('playlists', v),
};
