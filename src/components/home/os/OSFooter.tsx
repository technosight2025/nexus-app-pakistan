import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/ui/Container"


export function OSFooter() {
  return (
    <footer className="bg-gradient-to-br from-[#02182B] via-[#053225] to-[#0A4736] pt-16 pb-8 border-t border-white/10 text-white/80">
      <Container>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 lg:gap-24">
          
          {/* Brand Info */}
          <div className="flex-[1.5] max-w-sm">
            <Link href="/" className="inline-block mb-6">
              <span className="font-heading font-light text-3xl tracking-widest text-white">
                NEXUS
              </span>
            </Link>
            <p className="text-sm text-emerald-100/60 leading-relaxed font-light mb-8">
              The operating system for Pakistan's event, hospitality, and business ecosystem. Plan events, run businesses, manage venues, build memories.
            </p>
          </div>

          {/* Links Grid */}
          <div className="flex-[2] grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Platform</h4>
              <ul className="space-y-2 text-sm text-emerald-100/60 font-medium">
                <li><Link href="/business" className="hover:text-emerald-300 transition-colors">OS Modules</Link></li>
                <li><Link href="/business" className="hover:text-emerald-300 transition-colors">Customer CRM</Link></li>
                <li><Link href="/business" className="hover:text-emerald-300 transition-colors">Vendor Portal</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Solutions</h4>
              <ul className="space-y-2 text-sm text-emerald-100/60 font-medium">
                <li><Link href="/search" className="hover:text-emerald-300 transition-colors">Small Companies</Link></li>
                <li><Link href="/search" className="hover:text-emerald-300 transition-colors">Showrooms</Link></li>
                <li><Link href="/search" className="hover:text-emerald-300 transition-colors">Venues</Link></li>
                <li><Link href="/search" className="hover:text-emerald-300 transition-colors">Studios</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Resources</h4>
              <ul className="space-y-2 text-sm text-emerald-100/60 font-medium">
                <li><Link href="/blog" className="hover:text-emerald-300 transition-colors">Blog</Link></li>
                <li><Link href="/docs" className="hover:text-emerald-300 transition-colors">Documentation</Link></li>
                <li><Link href="/api" className="hover:text-emerald-300 transition-colors">API Docs</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Legal</h4>
              <ul className="space-y-2 text-sm text-emerald-100/60 font-medium">
                <li><Link href="/privacy" className="hover:text-emerald-300 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-emerald-300 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Social */}
          <div className="flex-1 space-y-4">
             <h4 className="text-xs font-bold text-white uppercase tracking-widest">Stay Connected</h4>
             <div className="flex items-center gap-4">
               <a href="#" className="text-white hover:text-emerald-500 transition-colors">FB</a>
               <a href="#" className="text-white hover:text-emerald-500 transition-colors">IG</a>
               <a href="#" className="text-white hover:text-emerald-500 transition-colors">TW</a>
               <a href="#" className="text-white hover:text-emerald-500 transition-colors">LI</a>
             </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/10 text-xs text-center text-emerald-100/40">
          <p>© {new Date().getFullYear()} NEXUS Ecosystem. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
