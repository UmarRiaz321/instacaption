// src/components/Footer.tsx

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-auto w-full backdrop-blur-md bg-white/5 border-t border-white/10 text-white text-sm text-center py-6">
      <p className="mb-2 text-white/50">
        © {new Date().getFullYear()}{' '}
        <Link href="/" className="hover:text-white font-medium transition">
          Caption Wizard AI
        </Link>
      </p>
      <p className="space-x-6">
        <Link href="/about" className="hover:text-indigo-400 underline transition">
          About
        </Link>
        {/* <Link href="/privacy" className="hover:text-indigo-400 underline transition">
          Privacy
        </Link> */}
      </p>
    </footer>
  )
}
