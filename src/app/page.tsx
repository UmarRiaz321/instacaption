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
      highlightStats,
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
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-24 pt-10 lg:px-6">
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

        <div className="relative space-y-8">
          <div className="flex flex-col gap-6 border-b border-[var(--border-subtle)] pb-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <p className="tech-label">Generator</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
                Write a post-ready caption in one pass.
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
                Describe the post, choose the tone, and generate a polished caption set with hashtags in seconds.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[28rem]">
              {highlightStats.map((stat) => (
                <div key={stat.label} className="glass-card rounded-2xl p-4 text-center">
                  <p className="text-2xl font-semibold text-[var(--accent-primary)]">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wide text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-[32px] border border-white/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.56),rgba(232,244,255,0.72))] p-5 shadow-[0_40px_100px_-60px_rgba(14,165,233,0.4)] backdrop-blur-xl dark:border-sky-400/10 dark:bg-[linear-gradient(180deg,rgba(4,18,36,0.66),rgba(7,24,48,0.88))] lg:p-6">
              <div className="flex flex-col gap-3 border-b border-[var(--border-subtle)] pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="tech-label">Main Workflow</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                    Input, choose, generate
                  </h2>
                </div>
                <span className="glass-pill rounded-full px-3 py-1.5 text-xs font-medium text-muted">
                  Results stay in view
                </span>
              </div>

              <div className="mt-6 space-y-8">
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

                <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(14,165,233,0.35),transparent)]" />

                <VibeSelector groups={vibeGroups} selected={tone} onSelect={setTone} />

                <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(14,165,233,0.35),transparent)]" />

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
              </div>
            </div>

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

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <InspirationLab
          cards={inspirationDeck}
          onApply={handleApplyInspiration}
          onToneSelect={setTone}
          onPromptLoad={setDescription}
        />
        <WorkflowTips />
      </section>

      <section id="faq" className="glass-card rounded-[32px] p-8 transition-colors">
        <h2 className="text-2xl font-semibold text-foreground">Common questions</h2>
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
  )
}
