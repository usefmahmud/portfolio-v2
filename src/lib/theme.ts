export type ThemeMode = 'light' | 'dark' | 'auto'

export const THEME_STORAGE_KEY = 'theme'

export function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'auto'
}

export function readStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'auto'
  }
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return isThemeMode(stored) ? stored : 'auto'
  } catch {
    return 'auto'
  }
}

export function resolveTheme(mode: ThemeMode, prefersDark: boolean) {
  return mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode
}

export function applyTheme(mode: ThemeMode) {
  if (typeof document === 'undefined') {
    return
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const resolved = resolveTheme(mode, prefersDark)
  const root = document.documentElement

  root.classList.remove('light', 'dark')
  root.classList.add(resolved)
  root.dataset.themeMode = mode
  root.style.colorScheme = resolved
}

export function storeTheme(mode: ThemeMode) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode)
  } catch {
    /* Storage can be blocked; the in-memory theme still applies. */
  }
}

/**
 * Runs before first paint so the correct theme class is on <html> when the
 * browser styles the page — without it the document flashes the light theme.
 */
export const THEME_INIT_SCRIPT = [
  '(function(){',
  'try{',
  "var KEY='theme',root=document.documentElement;",
  'var stored=localStorage.getItem(KEY);',
  "var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';",
  "var dark=window.matchMedia('(prefers-color-scheme: dark)').matches;",
  "var resolved=mode==='auto'?(dark?'dark':'light'):mode;",
  "root.classList.remove('light','dark');",
  'root.classList.add(resolved);',
  'root.setAttribute("data-theme-mode",mode);',
  'root.style.colorScheme=resolved;',
  '}catch(e){}',
  '})();',
].join('')
