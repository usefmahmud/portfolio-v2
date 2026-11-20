import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { site } from '../content'
import { CloseIcon, MenuIcon } from './Icons'
import ThemeToggle from './ThemeToggle'

const NAV_ITEMS = [
  { to: '/', label: 'Index', exact: true },
  { to: '/projects', label: 'Work', exact: false },
  { to: '/about', label: 'About', exact: true },
  { to: '/contact', label: 'Contact', exact: true },
] as const

/*
 * Colour lives on the active/inactive props only. Putting `text-ink-faint` in
 * the base class and `text-ink` in activeProps leaves two competing utilities
 * on the element and the later rule in the stylesheet wins, not the active
 * state. The active link also keeps its accent underline drawn.
 */
const linkBase = 't-meta link-line inline-flex min-h-11 items-center no-underline'
const linkActive = 'text-ink [background-size:100%_1px]'
const linkInactive = 'text-ink-faint hover:text-ink'

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
      <div className="shell flex h-[4.5rem] items-center justify-between gap-5">
        <Link
          to="/"
          aria-label={`${site.name} — home`}
          className="group flex items-baseline gap-2.5 no-underline"
        >
          <span className="font-serif text-[1.3rem] leading-none tracking-[-0.02em] text-ink">
            {site.shortName.toLowerCase()}
            <span className="text-accent">.</span>
          </span>
          <span className="t-meta hidden sm:inline">{site.location}</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="m-0 flex list-none items-center gap-7 p-0">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.exact }}
                  activeProps={{ className: linkActive }}
                  inactiveProps={{ className: linkInactive }}
                  className={linkBase}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink-muted transition-colors duration-200 hover:border-line-control hover:text-ink md:hidden"
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
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{
              duration: reduceMotion ? 0 : 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="border-t border-line bg-canvas md:hidden"
          >
            <ul className="shell m-0 flex list-none flex-col p-0">
              {NAV_ITEMS.map((item, index) => (
                <li key={item.to} className="border-b border-line last:border-0">
                  <Link
                    to={item.to}
                    activeOptions={{ exact: item.exact }}
                    activeProps={{ className: 'text-ink' }}
                    inactiveProps={{ className: 'text-ink-muted' }}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-3 no-underline"
                  >
                    <span className="t-heading">{item.label}</span>
                    <span className="t-num">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
