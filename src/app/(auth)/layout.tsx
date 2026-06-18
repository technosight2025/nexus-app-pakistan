import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | NEXUS',
  description: 'Sign in to your NEXUS account',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
