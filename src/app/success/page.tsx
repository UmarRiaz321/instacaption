import { Suspense } from 'react'
import SuccessContent from './SuccessContent'

export const metadata = {
  title: 'Success – Caption Wizard AI',
  description: 'Thanks for your upgrade! You’re now a premium user.',
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-muted">Loading success...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
