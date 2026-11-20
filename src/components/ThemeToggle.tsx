import { useEffect, useState } from 'react'
import { applyTheme, readStoredTheme, storeTheme } from '../lib/theme'
import type { ThemeMode } from '../lib/theme'
import { MonitorIcon, MoonIcon, SunIcon } from './Icons'

const MODE_LABEL: Record<ThemeMode, string> = {
  auto: 'System',
  light: 'Light',
  dark: 'Dark',
}

const NEXT_MODE: Record<ThemeMode, ThemeMode> = {
  light: 'dark',
  dark: 'auto',
  auto: 'light',
}

const MODE_ICON = {
  auto: MonitorIcon,
  light: SunIcon,
  dark: MoonIcon,
} as const

/**
 * Three-state theme control (light → dark → system), persisted in
 * localStorage. The pre-paint script in `lib/theme.ts` applies the stored
 * choice before first paint, so colour never flashes on load.
 */
export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('auto')

  useEffect(() => {
    const stored = readStoredTheme()
    setMode(stored)
    applyTheme(stored)
  }, [])

  useEffect(() => {
    if (mode !== 'auto') {
      return
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyTheme('auto')

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [mode])

  function handleToggle() {
    const next = NEXT_MODE[mode]
    setMode(next)
    applyTheme(next)
    storeTheme(next)
  }

  const Icon = MODE_ICON[mode]
  const label = `Theme: ${MODE_LABEL[mode]}. Switch to ${MODE_LABEL[NEXT_MODE[mode]].toLowerCase()}.`

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={label}
      title={label}
      className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink-muted transition-colors duration-200 hover:border-line-control hover:text-ink"
    >
      {/* Keyed so the icon remounts and replays the 180ms swap. */}
      <span key={mode} className="icon-in inline-flex">
        <Icon className="size-4" />
      </span>
    </button>
  )
}
