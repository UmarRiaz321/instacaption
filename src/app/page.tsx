'use client'

import type { KeyboardEvent } from 'react'
import { useMemo } from 'react'
import { useUser } from '@/context/UserContext'
import { useGenerator } from '@/features/generator/hooks/useGenerator'
import { ActionBar } from '@/features/generator/components/ActionBar'
import { GeneratorHero } from '@/features/generator/components/GeneratorHero'
import { InspirationLab } from '@/features/generator/components/InspirationLab'
import { PromptEditor } from '@/features/generator/components/PromptEditor'
import { ResultsPanel } from '@/features/generator/components/ResultsPanel'
import { VibeSelector } from '@/features/generator/components/VibeSelector'
import { WorkflowTips } from '@/features/generator/components/WorkflowTips'
import { MAX_DESCRIPTION_LENGTH } from '@/features/generator/constants'

const creatorFAQs = [
  {
    question: 'How futuristic is this caption AI?',
    answer:
      'It blends storytelling, trending audio hooks, and SEO keywords to deliver captions your audience saves. Expect emoji-aware copy and CTA variations.',
  },
  {
    question: 'Can I mix vibes?',
    answer:
      'Absolutely. Generate with one vibe in mind, then switch tones and regenerate to stack the best lines into one caption.',
  },
  {
    question: 'Is it really free?',
    answer:
      'Yes. Every vibe is unlocked. We believe in empowering creators and brands without paywalls.',
  },
  {
    question: 'Will this work for TikTok or Reels?',
    answer:
      'Yes. Captions focus on hooks, storytelling, and social SEO—perfect for TikTok, Reels, Shorts, and beyond.',
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
      copiedIndex,
      error,
      characterCount,
      wordCount,
      estimatedTokens,
      isOverCharacterLimit,
      canGenerate,
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
      handleApplyInspiration,
      handleClearResults,
    },
  } = useGenerator(email ?? null)

  const handlePromptKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      handleGenerate()
    }
  }

  const heroStats = useMemo(() => highlightStats, [highlightStats])

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-24 pt-12 lg:px-6">
      <section id="generator" className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <GeneratorHero stats={heroStats} />

          <div className="space-y-6">
            <PromptEditor
              description={description}
              onChange={setDescription}
              onKeyDown={handlePromptKeyDown}
              quickPrompts={quickPrompts}
              characterCount={characterCount}
              wordCount={wordCount}
              estimatedTokens={estimatedTokens}
              maxCharacters={MAX_DESCRIPTION_LENGTH}
              isOverLimit={isOverCharacterLimit}
            />

            <VibeSelector groups={vibeGroups} selected={tone} onSelect={setTone} />

            <ActionBar
              primaryLabel={loading ? 'Summoning new captions…' : 'Generate captions'}
              secondaryLabel="Clear results"
              onPrimary={handleGenerate}
              onSecondary={handleClearResults}
              disablePrimary={loading || !canGenerate}
              usageMessage={usageMessage}
              error={error}
            />
          </div>
        </div>

        <aside className="space-y-6">
          <WorkflowTips />
          <InspirationLab
            cards={inspirationDeck}
            onApply={handleApplyInspiration}
            onToneSelect={setTone}
            onPromptLoad={setDescription}
          />
        </aside>
      </section>

      <ResultsPanel
        captions={captions}
        copiedIndex={copiedIndex}
        onCopy={handleCopy}
        onRegenerate={handleGenerate}
      />

      <section id="faq" className="glass-card rounded-3xl p-8 transition-colors">
        <h2 className="text-2xl font-semibold text-foreground">Creator playbook</h2>
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
