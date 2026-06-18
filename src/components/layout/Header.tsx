import { Bell, MessageSquare } from "lucide-react"

export function Header() {
  return (
    <header className="h-12 border-b border-outline bg-surface flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4 hidden md:flex">
         <nav className="flex gap-4">
            <span className="text-sm font-medium text-primary">Dashboard</span>
            <span className="text-sm font-medium text-muted-foreground hover:text-primary cursor-pointer">CRM</span>
            <span className="text-sm font-medium text-muted-foreground hover:text-primary cursor-pointer">Bookings</span>
         </nav>
      </div>
      <div className="flex items-center gap-4 ml-auto">
         <button className="bg-primary/10 text-primary px-4 py-1 rounded text-xs font-bold uppercase tracking-wider">
           Live Broadcast
         </button>
         <div className="flex items-center gap-3 text-muted-foreground">
            <MessageSquare className="w-5 h-5 cursor-pointer hover:text-primary" />
            <Bell className="w-5 h-5 cursor-pointer hover:text-primary" />
         </div>
         <div className="w-8 h-8 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold text-xs ml-2">
            AH
         </div>
      </div>
    </header>
  )
}
