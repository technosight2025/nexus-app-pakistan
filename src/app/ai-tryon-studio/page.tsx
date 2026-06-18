import AITryOnStudioClient from '@/components/studio/AITryOnStudioClient'

export const metadata = {
  title: 'AI Try-On Studio | Nexus',
  description: 'Experience our state-of-the-art Virtual Try-On Studio',
}

import { Suspense } from 'react'

export default function AITryOnStudioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-[#D4AF37]">Loading Studio...</div>}>
      <AITryOnStudioClient />
    </Suspense>
  )
}
