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
  const label = `Theme: ${MODE_LABEL[mode]}. Switch to ${MODE_LABEL[NEXT_MODE[mode]].toLowerCase()} mode.`

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={label}
      title={label}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-3 text-sm font-medium text-ink-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
    >
      <Icon className="size-4 shrink-0" />
      <span className="hidden sm:inline">{MODE_LABEL[mode]}</span>
    </button>
  )
}
