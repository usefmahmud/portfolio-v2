import { useEffect, useState } from 'react'

const FORMATTER = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Africa/Cairo',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

/**
 * Local time in Cairo, rendered after hydration only.
 *
 * Server and client would disagree by seconds on the exact string, so the
 * placeholder is a fixed-width `--:--` and the real value arrives on mount —
 * no hydration mismatch, no layout shift.
 */
export default function Clock({ className = '' }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => setTime(FORMATTER.format(new Date()))
    tick()
    const id = window.setInterval(tick, 20_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <time
      className={className}
      dateTime={new Date().toISOString()}
      aria-label="Current local time in Cairo"
    >
      {time ?? '--:--'}
    </time>
  )
}
