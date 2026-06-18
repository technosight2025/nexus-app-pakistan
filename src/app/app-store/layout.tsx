import React from 'react'

export const metadata = {
  title: 'Nexus App Store',
  description: 'Install enterprise modules to extend your Nexus platform',
}

export default function AppStoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FDFBF7] selection:bg-[#0A3B2A]/20 selection:text-[#0A3B2A]">
      {children}
    </div>
  )
}
