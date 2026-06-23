import React from 'react';
import Link from 'next/link';

// Helper component for social icons (green filled circles with white symbols)
const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="w-[26px] h-[26px] rounded-full bg-[#0F5B3E] hover:bg-[#0d4d34] flex items-center justify-center text-white transition-colors shrink-0"
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#ECE7DF] pt-12 pb-8 px-6 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-x-6 gap-y-10 mb-16 items-start">
          
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-3 md:col-span-2 flex flex-col items-start min-w-[150px]">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-[26px] h-[26px] flex items-center justify-center relative">
                <svg viewBox="0 0 24 24" className="w-full h-full text-[#0F5B3E]" fill="currentColor">
                  <path d="M4 2v20h4V8l8 14h4V2h-4v14L8 2H4z" />
                </svg>
              </div>
              <span className="text-[#1F2937] font-bold text-[20px] tracking-tight ml-0.5">NEXUS</span>
            </Link>
            <p className="text-[12px] text-[#6B7280] font-[500] leading-snug mb-5">
              Pakistan's Event & Business<br />Operating System
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <SocialIcon href="https://facebook.com">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6.5c0-.8.2-1.2 1.2-1.2H16V1h-3.2C9.8 1 9 2.5 9 4.8V8z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://instagram.com">
                <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://youtube.com">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.519 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.519 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://linkedin.com">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Links Column 1: Platform */}
          <div className="flex flex-col gap-2.5 min-w-[90px]">
            <h4 className="font-[700] text-[#1F2937] text-[13px] leading-tight mb-1.5">Platform</h4>
            <Link href="/demo" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Features</Link>
            <Link href="/demo" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">How It Works</Link>
            <Link href="/pricing" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Pricing</Link>
            <Link href="/tools" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Apps</Link>
          </div>

          {/* Links Column 2: Marketplace */}
          <div className="flex flex-col gap-2.5 min-w-[90px]">
            <h4 className="font-[700] text-[#1F2937] text-[13px] leading-tight mb-1.5">Marketplace</h4>
            <Link href="/explore" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Venues</Link>
            <Link href="/explore" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Vendors</Link>
            <Link href="/studios" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Studios</Link>
            <Link href="/explore" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">All Categories</Link>
          </div>

          {/* Links Column 3: Business Solutions */}
          <div className="flex flex-col gap-2.5 min-w-[110px]">
            <h4 className="font-[700] text-[#1F2937] text-[13px] leading-tight mb-1.5">Business Solutions</h4>
            <Link href="/business/venues" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Venue OS</Link>
            <Link href="/business/studio" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Studio OS</Link>
            <Link href="/business/restaurant" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Restaurant OS</Link>
            <Link href="/business/workforce" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Workforce OS</Link>
          </div>

          {/* Links Column 4: Displays */}
          <div className="flex flex-col gap-2.5 min-w-[100px]">
            <h4 className="font-[700] text-[#1F2937] text-[13px] leading-tight mb-1.5">Displays</h4>
            <Link href="/displays" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Digital Signage</Link>
            <Link href="/displays" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Welcome Screens</Link>
            <Link href="/displays" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Wayfinding</Link>
            <Link href="/displays" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Android TV App</Link>
          </div>

          {/* Links Column 5: Invitations */}
          <div className="flex flex-col gap-2.5 min-w-[110px]">
            <h4 className="font-[700] text-[#1F2937] text-[13px] leading-tight mb-1.5">Invitations</h4>
            <Link href="/invite" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Digital Invites</Link>
            <Link href="/invite/demo-guest-view" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">RSVP & Guest Portal</Link>
            <Link href="/invite" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Themes</Link>
            <Link href="/invite" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Music & Videos</Link>
          </div>

          {/* Links Column 6: Memories */}
          <div className="flex flex-col gap-2.5 min-w-[90px]">
            <h4 className="font-[700] text-[#1F2937] text-[13px] leading-tight mb-1.5">Memories</h4>
            <Link href="/memories" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Albums</Link>
            <Link href="/memories" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Videos</Link>
            <Link href="/memories" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Messages</Link>
            <Link href="/memories" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Voice Notes</Link>
          </div>

          {/* Links Column 7: Support */}
          <div className="flex flex-col gap-2.5 min-w-[100px]">
            <h4 className="font-[700] text-[#1F2937] text-[13px] leading-tight mb-1.5">Support</h4>
            <Link href="/demo" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Help Center</Link>
            <Link href="/demo" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Contact Us</Link>
            <Link href="/register" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Become a Partner</Link>
          </div>

          {/* Links Column 8: Company */}
          <div className="flex flex-col gap-2.5 min-w-[90px]">
            <h4 className="font-[700] text-[#1F2937] text-[13px] leading-tight mb-1.5">Company</h4>
            <Link href="/demo" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">About Us</Link>
            <Link href="/" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Careers</Link>
            <Link href="/" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Blog</Link>
            <Link href="/" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#0F5B3E] transition-colors">Press</Link>
          </div>

        </div>

        {/* Bottom Footer Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#ECE7DF] gap-4">
          <div className="text-[12px] text-[#6B7280] font-[500]">
            © 2025 NEXUS. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#1F2937] transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[12px] text-[#6B7280] font-[500] hover:text-[#1F2937] transition-colors">Terms of Service</Link>
            <span className="text-[12px] text-[#6B7280] font-[500] flex items-center gap-1.5">
              Made with ❤️ in Pakistan
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
