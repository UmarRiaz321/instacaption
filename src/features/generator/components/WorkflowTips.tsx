const tips = [
  'Start with the setting, subject, and mood.',
  'Mention the action or outcome if you want a stronger call to action.',
  'If the first set is close, switch styles and generate again instead of rewriting from scratch.',
]

export function WorkflowTips() {
  return (
    <div className="glass-card rounded-3xl p-6 transition-colors">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Get better results</h2>
      <ul className="mt-4 space-y-3 text-sm text-muted">
        {tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </div>
  )
}
