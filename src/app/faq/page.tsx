import Link from 'next/link'

export const metadata = {
  title: 'FAQ – Caption Wizard AI',
  description: 'Common questions about Caption Wizard AI and how it works.',
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#f4f4fb] text-gray-800 p-6 flex justify-center items-start">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-md border border-gray-200 space-y-6">
        <h1 className="text-3xl font-bold">❓ Frequently Asked Questions</h1>

        <div>
          <h2 className="text-lg font-semibold">What is Caption Wizard AI?</h2>
          <p className="text-sm text-gray-600">
            It&apos;s an AI-powered tool that generates perfect Instagram captions based on your description and tone.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Is it free to use?</h2>
          <p className="text-sm text-gray-600">
            Yes! You get access to several free tones. Premium tones and features are unlocked with a one-time £5 upgrade or by inviting 3 friends.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Do I need to create an account?</h2>
          <p className="text-sm text-gray-600">
            No account needed. Just enter your email to personalize your session and track invites or premium access.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Can I invite friends to get Premium?</h2>
          <p className="text-sm text-gray-600">
            Yes! Share your referral link — if 3 people use it, you’ll get 7 days of Premium automatically.
          </p>
        </div>

        <Link href="/" className="text-sm text-indigo-500 underline">
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}
