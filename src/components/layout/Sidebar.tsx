import Link from "next/link"
import { Menu, LayoutDashboard, ShoppingCart, BarChart, Image as ImageIcon, Settings, Bell } from "lucide-react"

export function Sidebar() {
  return (
    <aside className="w-56 bg-surface border-r border-outline hidden md:flex flex-col z-40 h-screen sticky top-0">
      <div className="p-4 border-b border-outline bg-primary text-primary-foreground h-12 flex items-center justify-center">
        <Link href="/" className="font-bold text-lg tracking-tight flex items-center gap-2">
          <Menu className="w-5 h-5" />
          NEXUS
        </Link>
      </div>
      
      <div className="p-4 border-b border-outline bg-background/50">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Organization</p>
        <h3 className="text-sm font-bold text-primary truncate">Elite Event Solutions</h3>
      </div>
      
      <nav className="p-2 space-y-1 flex-1">
        <Link href="/dashboard/vendor" className="w-full flex items-center gap-3 px-3 py-2 text-primary bg-primary-container rounded font-medium text-sm">
          <LayoutDashboard className="w-5 h-5" />
          Overview
        </Link>
        <Link href="/dashboard/vendor/portfolio" className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-background rounded font-medium text-sm transition-all">
          <ImageIcon className="w-5 h-5" />
          Portfolio
        </Link>
        <Link href="/dashboard/vendor/packages" className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-background rounded font-medium text-sm transition-all">
          <ShoppingCart className="w-5 h-5" />
          Packages
        </Link>
        <Link href="/dashboard/vendor/analytics" className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-background rounded font-medium text-sm transition-all">
          <BarChart className="w-5 h-5" />
          Analytics
        </Link>
      </nav>
      
      <Link href="/test" className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-background rounded font-medium text-sm transition-all">
        <Menu className="w-5 h-5" />
        Test Page
      </Link>
      
      <div className="p-4 mt-auto">
        <button className="w-full bg-primary text-primary-foreground py-2.5 rounded font-bold text-sm shadow-sm hover:opacity-90 transition-all mb-4">
          Publish Profile
        </button>
        <div className="flex justify-between px-2 text-muted-foreground">
           <Settings className="w-4 h-4 cursor-pointer hover:text-primary" />
           <Bell className="w-4 h-4 cursor-pointer hover:text-primary" />
        </div>
      </div>
    </aside>
  )
}
