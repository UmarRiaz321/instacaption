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
    <div className="relative flex w-full flex-col pb-24">
      <section
        id="generator"
        aria-labelledby="generator-heading"
        className="relative isolate min-h-[calc(100vh-4.5rem)] overflow-hidden border-y border-[var(--border-subtle)] bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_24%),radial-gradient(circle_at_85%_12%,rgba(59,130,246,0.16),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(242,248,255,0.96))] dark:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_22%),radial-gradient(circle_at_85%_12%,rgba(56,189,248,0.12),transparent_20%),linear-gradient(180deg,rgba(3,15,30,0.96),rgba(7,24,48,0.94))]"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(14,165,233,0.7),transparent)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-16 top-12 h-52 w-52 rounded-full bg-sky-300/24 blur-3xl dark:bg-cyan-400/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-blue-300/14 blur-3xl dark:bg-sky-400/10"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid gap-6 border-b border-[var(--border-subtle)] pb-8 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
            <div className="max-w-3xl space-y-3">
              <p className="tech-label">AI Caption Generator</p>
              <h1 id="generator-heading" className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
                Generate captions for Instagram, TikTok, and Reels
              </h1>
              <p id="generator-summary" className="max-w-2xl text-base leading-7 text-muted sm:text-lg">
                Describe the post in plain language, pick a vibe, and get ready-to-post captions with matching hashtags in one clean workflow.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 xl:max-w-md xl:justify-end">
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

          <div className="w-full max-w-5xl space-y-7">
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

            <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(14,165,233,0.26),transparent)]" />

            <VibeSelector groups={vibeGroups} selected={tone} onSelect={setTone} />

            <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(14,165,233,0.26),transparent)]" />

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
      </section>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pt-10 lg:px-6">
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
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </div>
  )
}
