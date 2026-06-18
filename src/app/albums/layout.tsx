export default function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black font-poppins selection:bg-white/30 selection:text-white">
      {children}
    </div>
  )
}
