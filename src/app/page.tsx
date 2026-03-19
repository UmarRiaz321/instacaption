'use client'

import type { KeyboardEvent } from 'react'
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
    <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-24 pt-12 lg:px-6">
      <section id="generator" className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <GeneratorHero stats={highlightStats} />

          <div className="space-y-6">
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

            <VibeSelector groups={vibeGroups} selected={tone} onSelect={setTone} />

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
        copiedTarget={copiedTarget}
        loading={loading}
        onCopy={handleCopy}
        onCopyAll={handleCopyAll}
        onRegenerate={handleGenerate}
      />

      <section id="faq" className="glass-card rounded-3xl p-8 transition-colors">
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
