// src/components/Footer.tsx

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 pt-6 text-sm text-white/50 text-center">
      <p className="mb-2">
        © {new Date().getFullYear()} <Link href="/" className="hover:text-white font-medium">Caption Wizard AI</Link>
      </p>
      <p className="space-x-4">
        <Link href="/about" className="hover:text-white underline">About</Link>
        {/* You can add more later: */}
        {/* <Link href="/privacy" className="hover:text-white underline">Privacy</Link> */}
      </p>
    </footer>
  )
}
