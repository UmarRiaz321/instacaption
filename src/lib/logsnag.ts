export async function track(event: string, properties: Record<string, unknown> = {}) {
  await fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, properties }),
  })
}
