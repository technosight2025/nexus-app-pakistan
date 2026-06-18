import Link from "next/link"
import { Globe, Mail, MessageCircle, Share2, Heart } from "lucide-react"

export function MegaFooter() {
  return (
    <footer className="bg-white pt-24 pb-8 border-t-2 border-dashed border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black text-primary mb-6 flex items-center gap-2">
              NEXUS <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
            </h2>
            <p className="text-lg text-muted-foreground font-medium mb-8 max-w-sm leading-relaxed">
              Pakistan&apos;s happiest and most joyful event ecosystem. Plan, book, and celebrate your unforgettable moments with us! 🎉
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white hover:-translate-y-1 transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center hover:bg-sky-500 hover:text-white hover:-translate-y-1 transition-all">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white hover:-translate-y-1 transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-black text-foreground text-lg mb-6">Marketplace</h4>
            <ul className="space-y-4">
              <li><Link href="/venues" className="text-muted-foreground font-medium hover:text-primary transition-colors">Venues</Link></li>
              <li><Link href="/vendors" className="text-muted-foreground font-medium hover:text-primary transition-colors">Vendors</Link></li>
              <li><Link href="/studios" className="text-muted-foreground font-medium hover:text-primary transition-colors">Studios</Link></li>
              <li><Link href="/business/workforce" className="text-muted-foreground font-medium hover:text-primary transition-colors">Workforce</Link></li>
              <li><Link href="/marketplace" className="text-muted-foreground font-medium hover:text-primary transition-colors">Event Packages</Link></li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="font-black text-foreground text-lg mb-6">Platforms</h4>
            <ul className="space-y-4">
              <li><Link href="/invite" className="text-muted-foreground font-medium hover:text-primary transition-colors">Digital Invitations</Link></li>
              <li><Link href="/memories" className="text-muted-foreground font-medium hover:text-primary transition-colors">Memories Portal</Link></li>
              <li><Link href="/displays" className="text-muted-foreground font-medium hover:text-primary transition-colors">Digital Displays</Link></li>
              <li><Link href="/events/dashboard" className="text-muted-foreground font-medium hover:text-primary transition-colors">Customer Portal</Link></li>
            </ul>
          </div>

          {/* Business OS */}
          <div>
            <h4 className="font-black text-foreground text-lg mb-6">Business OS</h4>
            <ul className="space-y-4">
              <li><Link href="/business" className="text-muted-foreground font-medium hover:text-primary transition-colors">Business Solutions</Link></li>
              <li><Link href="/business/tools" className="text-muted-foreground font-medium hover:text-primary transition-colors">Tools & Apps</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground font-medium hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/" className="text-muted-foreground font-medium hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/demo" className="text-muted-foreground font-medium hover:text-primary transition-colors">Help Center</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t-2 border-dashed border-outline flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-muted-foreground font-medium">
            © {new Date().getFullYear()} NEXUS Platform. Designed with ❤️ in Pakistan.
          </p>
          <div className="flex gap-6 text-sm font-bold text-muted-foreground">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
