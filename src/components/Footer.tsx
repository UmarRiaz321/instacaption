// src/components/Footer.tsx

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-gray-200 text-sm text-gray-500 bg-[#f4f4fb] py-6 text-center">
      <p className="mb-2">
        © {new Date().getFullYear()}{' '}
        <Link
          href="/"
          className="font-medium text-gray-700 hover:text-blue-500 transition"
        >
          Caption Wizard AI
        </Link>
      </p>
      <p className="space-x-6">
        <Link
          href="/about"
          className="underline hover:text-indigo-500 transition"
        >
          About
        </Link>
        {/* <Link href="/privacy" className="underline hover:text-indigo-500 transition">
          Privacy
        </Link> */}
      </p>
    </footer>
  )
}
