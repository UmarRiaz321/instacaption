const tips = [
  'Start with the setting, subject, and mood.',
  'Mention the action or outcome if you want a stronger call to action.',
  'If the first set is close, switch styles and generate again instead of rewriting from scratch.',
]

export function WorkflowTips() {
  return (
    <div className="glass-card rounded-[28px] p-6 transition-colors">
      <p className="tech-label">Better Output</p>
      <h2 className="mt-3 text-xl font-semibold text-foreground">Small inputs. Cleaner captions.</h2>
      <ul className="mt-4 space-y-3 text-sm text-muted">
        {tips.map((tip) => (
          <li key={tip} className="rounded-2xl border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.38)] px-4 py-3 dark:bg-[rgba(4,18,36,0.38)]">
            {tip}
          </li>
        ))}
      </ul>
    </div>
  )
}
