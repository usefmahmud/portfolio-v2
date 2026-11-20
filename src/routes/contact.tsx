import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowUpRightIcon, GitHubIcon, MailIcon } from '../components/Icons'
import { site } from '../content'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: `Contact — ${site.name}` },
      {
        name: 'description',
        content: `Get in touch with ${site.name}, ${site.role} in ${site.location}.`,
      },
    ],
  }),
  component: ContactPage,
})

const inputClass =
  'mt-2 w-full rounded-xl border border-line-control bg-surface px-3.5 py-3 text-base text-ink outline-none transition-colors duration-200 placeholder:text-ink-faint focus:border-accent'

function ContactPage() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>(
    'idle',
  )

  const canSubmit = name.trim().length > 0 && message.trim().length > 0

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSubmit) {
      return
    }

    const subject = encodeURIComponent(`Portfolio enquiry — ${name.trim()}`)
    const body = encodeURIComponent(message.trim())
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('failed')
    }
    window.setTimeout(() => setCopyStatus('idle'), 3000)
  }

  return (
    <main id="main-content" className="page-shell pt-16 sm:pt-20">
      <p className="kicker m-0">Contact</p>
      <h1 className="mt-4 mb-0 max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
        {site.availability}
      </h1>
      <p className="mt-5 mb-0 max-w-[58ch] text-base leading-relaxed text-ink-muted">
        The fastest way to reach me is email. Tell me what you are building and
        what part you want help with.
      </p>

      <div className="mt-12 grid gap-12 sm:grid-cols-[1fr_1.1fr] sm:gap-16">
        <div>
          <h2 className="kicker m-0">Direct</h2>
          <ul className="mt-4 mb-0 flex list-none flex-col gap-1 p-0">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center gap-2 text-sm text-ink no-underline transition-colors duration-200 hover:text-accent"
              >
                <MailIcon className="size-4 text-ink-faint" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.github.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-11 items-center gap-2 text-sm text-ink no-underline transition-colors duration-200 hover:text-accent"
              >
                <GitHubIcon className="size-4 text-ink-faint" />
                github.com/{site.github.handle}
                <ArrowUpRightIcon className="size-3.5 text-ink-faint" />
              </a>
            </li>
          </ul>

          <button
            type="button"
            onClick={copyEmail}
            className="mt-4 inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-medium text-ink-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
          >
            Copy email address
          </button>
          <p
            role="status"
            aria-live="polite"
            className="mt-2 mb-0 min-h-5 text-xs text-ink-faint"
          >
            {copyStatus === 'copied'
              ? 'Copied to clipboard.'
              : copyStatus === 'failed'
                ? 'Could not copy — please select the address above.'
                : ''}
          </p>

          <h2 className="kicker mt-10 mb-0">Elsewhere</h2>
          <ul className="mt-4 mb-0 flex list-none flex-col gap-1 p-0">
            {site.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    link.href.startsWith('http')
                      ? 'noreferrer noopener'
                      : undefined
                  }
                  className="inline-flex min-h-11 items-center gap-2 text-sm text-ink-muted no-underline transition-colors duration-200 hover:text-ink"
                >
                  {link.label}
                  <span className="font-mono text-xs text-ink-faint">
                    {link.handle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
        >
          <h2 className="m-0 text-base font-semibold text-ink">
            Send a message
          </h2>
          <p className="mt-2 mb-0 text-sm leading-relaxed text-ink-muted">
            This form opens your mail client with the message pre-filled — no
            server, no stored drafts.
          </p>

          <div className="mt-6">
            <label
              htmlFor="contact-name"
              className="text-sm font-medium text-ink"
            >
              Your name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClass}
              placeholder="Who is writing"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="contact-message"
              className="text-sm font-medium text-ink"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={6}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={`${inputClass} resize-y`}
              placeholder="What you are working on, and what you need"
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            Open in mail client
          </button>
        </form>
      </div>
    </main>
  )
}
