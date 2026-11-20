import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { site } from '../content'
import { CloseIcon, MenuIcon } from './Icons'
import ThemeToggle from './ThemeToggle'

const NAV_ITEMS = [
  { to: '/', label: 'Home', exact: true },
  { to: '/projects', label: 'Work', exact: false },
  { to: '/about', label: 'About', exact: true },
  { to: '/contact', label: 'Contact', exact: true },
] as const

/*
 * Colour lives on the active/inactive props only. Putting `text-ink-muted` in
 * the base class and `text-ink` in activeProps leaves two competing utilities
 * on the element and the later rule in the stylesheet wins, not the active
 * state — the active tab silently stayed muted.
 */
const linkBase =
  'inline-flex min-h-11 items-center rounded-md px-2 text-sm font-medium no-underline transition-colors duration-200'
const linkActive = 'text-ink'
const linkInactive = 'text-ink-muted hover:text-ink'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!open) {
      return
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="page-shell flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          aria-label={`${site.name} — home`}
          className="group inline-flex min-h-11 items-center gap-2.5 no-underline"
        >
          <span className="flex size-9 items-center justify-center rounded-lg border border-line-strong bg-surface font-mono text-[0.7rem] font-semibold tracking-tight text-ink">
            {site.monogram}
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold text-ink">{site.name}</span>
            <span className="font-mono text-[0.65rem] tracking-wide text-ink-faint">
              {site.role}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              activeProps={{ className: linkActive }}
              inactiveProps={{ className: linkInactive }}
              className={linkBase}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink-muted transition-colors duration-200 hover:text-ink md:hidden"
          >
            {open ? (
              <CloseIcon className="size-4" />
            ) : (
              <MenuIcon className="size-4" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: reduceMotion ? 0 : 0.18,
              ease: 'easeOut',
            }}
            className="border-t border-line bg-canvas md:hidden"
          >
            <ul className="page-shell m-0 flex list-none flex-col gap-1 py-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    activeOptions={{ exact: item.exact }}
                    activeProps={{ className: linkActive }}
                    inactiveProps={{ className: linkInactive }}
                    onClick={() => setOpen(false)}
                    className={`${linkBase} w-full py-2`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
