const tips = [
  '• Mention the setting, audience, and feeling for best results.',
  '• Pair with emojis when you want extra personality.',
  '• Regenerate twice to blend two tones for unique copy.',
]

export function WorkflowTips() {
  return (
    <div className="glass-card rounded-3xl p-6 transition-colors">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Workflow tips</h2>
      <ul className="mt-4 space-y-3 text-sm text-muted">
        {tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </div>
  )
}
