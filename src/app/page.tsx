'use client'

import type { KeyboardEvent } from 'react'
import { useUser } from '@/context/UserContext'
import { useGenerator } from '@/features/generator/hooks/useGenerator'
import { ActionBar } from '@/features/generator/components/ActionBar'
import { InspirationLab } from '@/features/generator/components/InspirationLab'
import { PromptEditor } from '@/features/generator/components/PromptEditor'
import { ResultsPanel } from '@/features/generator/components/ResultsPanel'
import { VibeSelector } from '@/features/generator/components/VibeSelector'
import { WorkflowTips } from '@/features/generator/components/WorkflowTips'
import { MAX_DESCRIPTION_LENGTH } from '@/features/generator/constants'

const creatorFAQs = [
  {
    question: 'Do I need to know prompting?',
    answer:
      'No. Write a normal description of the post and choose a style. The tool handles the prompt formatting for you.',
  },
  {
    question: 'Can I change the tone without rewriting everything?',
    answer:
      'Yes. Keep the same description, switch the style, and generate again. It is a quick way to compare different versions.',
  },
  {
    question: 'Is it really free?',
    answer:
      'Yes. The app currently gives you 10 free runs per hour without requiring an account.',
  },
  {
    question: 'Will this work for TikTok or Reels?',
    answer:
      'Yes. The output is short enough to adapt for Instagram, TikTok, Reels, Shorts, and similar social posts.',
  },
]

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: creatorFAQs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
} as const

export default function Home() {
  const { email } = useUser()
  const {
    state: {
      description,
      tone,
      captions,
      loading,
      copiedTarget,
      error,
      characterCount,
      wordCount,
      isOverCharacterLimit,
      canGenerate,
      canReset,
      usageMessage,
      quickPrompts,
      inspirationDeck,
      vibeGroups,
    },
    actions: {
      setDescription,
      setTone,
      handleGenerate,
      handleCopy,
      handleCopyAll,
      handleApplyInspiration,
      handleReset,
    },
  } = useGenerator(email ?? null)

  const handlePromptKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      handleGenerate()
    }
  }

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-24 pt-10 lg:px-6">
      <section id="generator" className="console-frame rounded-[36px] p-5 sm:p-6 lg:p-8">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(14,165,233,0.7),transparent)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-10 top-12 h-40 w-40 rounded-full bg-sky-300/20 blur-3xl dark:bg-cyan-400/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-12 bottom-8 h-32 w-32 rounded-full bg-blue-400/10 blur-3xl dark:bg-sky-400/10"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-4xl space-y-6">
          <div className="flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="tech-label">AI Caption Generator</p>
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
                Generate captions for Instagram, TikTok, and Reels
              </h1>
              <p className="text-base leading-7 text-muted sm:text-lg">
                Describe the post in plain language, pick a vibe, and get ready-to-post captions with matching hashtags in the same workspace.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">
              <span className="glass-pill rounded-full px-3 py-1.5 text-xs font-medium text-muted">
                No prompt syntax
              </span>
              <span className="glass-pill rounded-full px-3 py-1.5 text-xs font-medium text-muted">
                Built for non-technical users
              </span>
              <span className="glass-pill rounded-full px-3 py-1.5 text-xs font-medium text-muted">
                Results stay below
              </span>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,250,255,0.99))] p-5 shadow-[0_40px_90px_-68px_rgba(14,165,233,0.32)] backdrop-blur-xl dark:border-sky-400/10 dark:bg-[linear-gradient(180deg,rgba(4,18,36,0.78),rgba(7,24,48,0.9))] lg:p-6">
            <div className="flex flex-col gap-3 border-b border-[var(--border-subtle)] pb-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="tech-label">Main Generator</p>
                <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-foreground sm:text-2xl">
                  Small input. One-tap style picker. Results in view.
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Write one or two lines, generate, and copy the caption you want to post.
                </p>
              </div>
              <span className="glass-pill rounded-full px-3 py-1.5 text-xs font-medium text-muted">
                One screen workflow
              </span>
            </div>

            <div className="mt-6 space-y-6">
              <PromptEditor
                description={description}
                onChange={setDescription}
                onKeyDown={handlePromptKeyDown}
                quickPrompts={quickPrompts}
                characterCount={characterCount}
                wordCount={wordCount}
                maxCharacters={MAX_DESCRIPTION_LENGTH}
                isOverLimit={isOverCharacterLimit}
              />

              <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(14,165,233,0.28),transparent)]" />

              <VibeSelector groups={vibeGroups} selected={tone} onSelect={setTone} />

              <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(14,165,233,0.28),transparent)]" />

              <ActionBar
                primaryLabel={loading ? 'Writing captions...' : 'Generate captions'}
                secondaryLabel="Start over"
                onPrimary={handleGenerate}
                onSecondary={handleReset}
                disablePrimary={loading || !canGenerate}
                disableSecondary={loading || !canReset}
                usageMessage={usageMessage}
                error={error}
              />

              <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(14,165,233,0.18),transparent)]" />

              <ResultsPanel
                captions={captions}
                copiedTarget={copiedTarget}
                loading={loading}
                onCopy={handleCopy}
                onCopyAll={handleCopyAll}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <InspirationLab
          cards={inspirationDeck}
          onApply={handleApplyInspiration}
          onToneSelect={setTone}
          onPromptLoad={setDescription}
        />
        <WorkflowTips />
      </section>

      <section id="faq" className="glass-card rounded-[32px] p-8 transition-colors">
        <h2 className="text-2xl font-semibold text-foreground">Frequently asked questions</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {creatorFAQs.map((item) => (
            <article key={item.question} className="glass-card rounded-2xl p-4 transition hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-foreground">{item.question}</h3>
              <p className="mt-2 text-sm text-muted">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </div>
  )
}
