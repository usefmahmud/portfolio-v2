import { useEffect, useRef, useState } from 'react'
import { projects } from '../content'
import { ArrowUpRightIcon, CloseIcon, GitHubIcon } from './Icons'

const SECRET = 'ship'

/**
 * Easter egg: typing `ship` anywhere opens a small panel.
 *
 * Accessibility choices that keep it from being a toy:
 *  - a real `<dialog>` (native focus trap, Escape, inert background);
 *  - never fires while the visitor is typing in a field;
 *  - the content is real — the three projects that did not make the front
 *    page — so the surprise is worth the keystrokes;
 *  - discoverable: the footer says it is there.
 */
export default function EasterEgg() {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let buffer = ''

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) {
        return
      }
      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      ) {
        return
      }
      if (event.key.length !== 1) {
        return
      }
      buffer = (buffer + event.key.toLowerCase()).slice(-SECRET.length)
      if (buffer === SECRET) {
        buffer = ''
        setOpen(true)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }
    if (open && !dialog.open) {
      dialog.showModal()
      closeRef.current?.focus()
    }
    if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  const lab = projects.filter((project) => !project.featured)

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setOpen(false)}
      aria-labelledby="lab-title"
      className="m-auto w-[min(34rem,calc(100vw-2rem))] border border-line bg-canvas p-0 text-ink backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <p className="t-meta m-0">Lab / unlisted</p>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="-mt-2 -mr-2 inline-flex size-9 items-center justify-center rounded-full text-ink-faint transition-colors duration-200 hover:text-ink"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>

        <h2 id="lab-title" className="t-heading mt-3 text-ink">
          You typed <span className="italic text-accent">ship</span>.
        </h2>
        <p className="t-body mt-2 mb-0 text-[0.95rem]">
          Three projects that did not make the front page, but are running
          anyway:
        </p>

        <ul className="mt-6 mb-0 list-none p-0">
          {lab.map((project) => (
            <li key={project.slug} className="border-t border-line last:border-b">
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-baseline justify-between gap-4 py-3 no-underline"
              >
                <span>
                  <span className="block text-sm text-ink">{project.name}</span>
                  <span className="mt-1 block text-xs text-ink-faint">
                    {project.tagline}
                  </span>
                </span>
                <GitHubIcon className="arrow-nudge size-4 shrink-0 text-ink-faint" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://github.com/usefmahmud"
          target="_blank"
          rel="noreferrer noopener"
          className="link-line mt-6 inline-flex items-center gap-2 text-sm text-ink no-underline"
        >
          All repos
          <ArrowUpRightIcon className="size-4 text-accent" />
        </a>
      </div>
    </dialog>
  )
}
