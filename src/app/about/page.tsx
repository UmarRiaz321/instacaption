import Link from 'next/link'
import Logo from '@/components/Logo'

export const metadata = {
  title: 'About – Caption Wizard AI',
  description: 'Learn more about Caption Wizard AI — how it works, why it exists, and who built it.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#111] text-white p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-[#1a1a1a] p-8 rounded-2xl shadow-lg border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Logo />
          <h1 className="text-3xl font-bold text-white">About Caption Wizard AI</h1>
        </div>

        <p className="text-white/70 mb-6 text-sm leading-relaxed">
          Caption Wizard AI is a tool that helps creators, influencers, and marketers generate scroll-stopping
          captions for Instagram and other social platforms — powered by cutting-edge AI.
        </p>

        <h2 className="text-xl font-semibold text-white mb-2">✨ Why we built this</h2>
        <p className="text-white/70 mb-6 text-sm leading-relaxed">
          Great content deserves a great caption. We built this tool to help anyone — even without writing skills —
          stand out online with just a few words and a little AI magic.
        </p>

        <h2 className="text-xl font-semibold text-white mb-2">🧠 How it works</h2>
        <ul className="text-white/70 mb-6 text-sm list-disc list-inside space-y-1">
          <li>You describe your photo or idea</li>
          <li>Pick a tone or vibe (funny, luxury, poetic, etc.)</li>
          <li>We generate 3 smart, optimized captions using AI</li>
          <li>Copy your favorite — or regenerate with a click</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mb-2">💼 Who made it</h2>
        <p className="text-white/70 text-sm mb-6">
          Built by an indie developer passionate about AI, creativity, and building in public.
        </p>

        <div className="flex items-center justify-between mt-10">
          <Link
            href="/"
            className="text-indigo-400 hover:text-indigo-300 transition text-sm underline"
          >
            ← Back to generator
          </Link>
          <a
            href="https://captionwizard.pro"
            target="_blank"
            className="text-sm text-white/40"
            rel="noopener noreferrer"
          >
            captionwizard.pro
          </a>
        </div>
      </div>
    </main>
  )
}
