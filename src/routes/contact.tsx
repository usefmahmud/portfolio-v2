import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowUpRightIcon, GitHubIcon, MailIcon } from '../components/Icons'
import Reveal from '../components/motion/Reveal'
import SplitReveal from '../components/motion/SplitReveal'
import { site } from '../content'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: `Contact — ${site.name}` },
      {
        name: 'description',
        content: `Email ${site.name}, ${site.role} in ${site.location}. Replies within a day.`,
      },
      { property: 'og:url', content: `${site.url}/contact` },
    ],
    links: [{ rel: 'canonical', href: `${site.url}/contact` }],
  }),
  component: ContactPage,
})

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
    <main id="main-content">
      <header className="shell pt-16 sm:pt-24">
        <p className="t-meta m-0">Contact</p>
        <h1 className="t-display mt-5 max-w-[13ch] text-ink">
          <SplitReveal mode="chars">Say what you are building</SplitReveal>
        </h1>
        <p className="t-lead mt-7 max-w-[48ch]">
          {site.availability}. Email is the fastest route — tell me the problem
          and the part you want help with.
        </p>
      </header>

      <div className="shell mt-14 grid gap-14 border-t border-line pt-12 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-baseline gap-3 text-ink no-underline"
          >
            <span className="link-line text-[clamp(1.1rem,2.2vw,1.5rem)] tracking-[-0.01em]">
              {site.email}
            </span>
            <ArrowUpRightIcon className="arrow-nudge size-5 shrink-0 text-accent" />
          </a>

          <div className="mt-5">
            <button
              type="button"
              onClick={copyEmail}
              className="btn btn-ghost"
            >
              Copy address
            </button>
            <p
              role="status"
              aria-live="polite"
              className="t-meta mt-2 mb-0 min-h-5"
            >
              {copyStatus === 'copied'
                ? 'Copied to clipboard'
                : copyStatus === 'failed'
                  ? 'Copy blocked — select the address above'
                  : ''}
            </p>
          </div>

          <h2 className="t-meta mt-12 mb-0">Elsewhere</h2>
          <ul className="mt-3 mb-0 flex list-none flex-col p-0">
            <li>
              <a
                href={site.github.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex min-h-11 items-center gap-2 text-sm text-ink no-underline"
              >
                <GitHubIcon className="size-4 text-ink-faint" />
                <span className="link-line">github.com/{site.github.handle}</span>
                <ArrowUpRightIcon className="arrow-nudge size-3.5 text-ink-faint" />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex min-h-11 items-center gap-2 text-sm text-ink no-underline"
              >
                <MailIcon className="size-4 text-ink-faint" />
                <span className="link-line">Email</span>
              </a>
            </li>
          </ul>

          <dl className="mt-12">
            <div className="flex items-baseline justify-between gap-6 border-t border-line py-3">
              <dt className="t-meta">Based in</dt>
              <dd className="m-0 text-[0.92rem] text-ink">{site.location}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-t border-line py-3 last:border-b">
              <dt className="t-meta">Replies</dt>
              <dd className="m-0 text-[0.92rem] text-ink">Within a day</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <form onSubmit={handleSubmit} className="border border-line p-6 sm:p-8">
              <h2 className="t-heading m-0 text-ink">Send a note</h2>
              <p className="t-body mt-2 mb-0 text-[0.92rem]">
                This form opens your mail client with the message pre-filled —
                no server, no stored drafts.
              </p>

              <div className="mt-8">
                <label htmlFor="contact-name" className="t-meta">
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
                  className="field mt-1"
                  placeholder="Who is writing"
                />
              </div>

              <div className="mt-7">
                <label htmlFor="contact-message" className="t-meta">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="field mt-1 resize-y"
                  placeholder="What you are building, and what you need"
                />
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="btn btn-solid mt-8 w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
              >
                Open in mail client
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </main>
  )
}
