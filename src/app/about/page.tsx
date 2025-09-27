import Link from 'next/link'
import Logo from '@/components/Logo'

export const metadata = {
  title: 'About – Caption Wizard AI',
  description: 'Learn more about Caption Wizard AI — how it works, why it exists, and who built it.',
}

export default function AboutPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background-primary)] px-4 py-16 text-foreground">
      <div className="glass-card w-full max-w-2xl space-y-6 rounded-3xl p-8">
        <div className="mb-2 flex items-center gap-3">
          <Logo />
          <h1 className="text-3xl font-bold text-foreground">About Caption Wizard AI</h1>
        </div>

        <p className="text-sm leading-relaxed text-muted">
          Caption Wizard AI is a tool that helps creators, influencers, and marketers generate scroll-stopping captions for Instagram and other social platforms — powered by cutting-edge AI.
        </p>

        <h2 className="mt-4 text-xl font-semibold text-foreground">✨ Why we built this</h2>
        <p className="text-sm leading-relaxed text-muted">
          Great content deserves a great caption. We built this tool to help anyone — even without writing skills — stand out online with just a few words and a little AI magic.
        </p>

        <h2 className="mt-4 text-xl font-semibold text-foreground">🧠 How it works</h2>
        <ul className="list-inside list-disc space-y-1 text-sm text-muted">
          <li>You describe your photo or idea.</li>
          <li>Pick a tone or vibe (funny, luxury, poetic, etc.).</li>
          <li>We generate 3 smart, optimized captions using AI.</li>
          <li>Copy your favourite — or regenerate with a click.</li>
        </ul>

        <h2 className="mt-4 text-xl font-semibold text-foreground">💼 Who made it</h2>
        <p className="text-sm text-muted">
          Built by an indie developer passionate about AI, creativity, and building in public.
        </p>

        <div className="mt-8 flex items-center justify-between border-t border-slate-200/70 pt-6">
          <Link
            href="/"
            className="text-sm font-medium text-indigo-500 transition hover:text-indigo-600"
          >
            ← Back to generator
          </Link>
          <a
            href="https://captionwizard.pro"
            target="_blank"
            className="text-sm text-muted"
            rel="noopener noreferrer"
          >
            captionwizard.pro
          </a>
        </div>
      </div>
    </main>
  )
}
