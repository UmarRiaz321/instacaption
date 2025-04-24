import { Suspense } from 'react'
import SuccessContent from './SuccessContent'

export const metadata = {
  title: 'Success – Caption Wizard AI',
  description: 'Thanks for your upgrade! You’re now a premium user.',
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center text-white p-12">Loading success...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
