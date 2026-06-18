"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from "lucide-react"

const BUNDLES = [
  {
    title: "The Essential",
    description: "Perfect for intimate gatherings.",
    price: "From Rs: 200,000",
    features: [
      "Premium Venue Space (up to 200 guests)",
      "Standard One-Dish Catering",
      "Basic Floral Decor & Stage",
      "Standard Sound System"
    ],
    popular: false,
    color: "bg-slate-50"
  },
  {
    title: "The Signature",
    description: "Our most booked all-inclusive package.",
    price: "From Rs: 500,000",
    features: [
      "Luxury Marquee/Hall (up to 500 guests)",
      "Premium Two-Dish Catering + Dessert",
      "Custom Themed Decor & Grand Stage",
      "Professional DJ & Lighting",
      "Bridal Room Access"
    ],
    popular: true,
    color: "bg-primary text-primary-foreground"
  },
  {
    title: "The Royal",
    description: "For the ultimate grand wedding experience.",
    price: "Custom Quote",
    features: [
      "5-Star Hotel Banquet (up to 1000+ guests)",
      "Gourmet Multi-Course Menu",
      "Imported Floral Arrangements",
      "Complete Event Management",
      "Complimentary Night Stay for Couple"
    ],
    popular: false,
    color: "bg-slate-900 text-white"
  }
]

export function VenueBundles() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            Venue + Services Bundles
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            Save up to 20% by booking your venue, catering, and decor together. Choose a package that fits your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BUNDLES.map((bundle, index) => (
            <motion.div
              key={bundle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-3xl p-8 relative overflow-hidden border border-outline shadow-sm ${bundle.color}`}
            >
              {bundle.popular && (
                <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-black mb-2">{bundle.title}</h3>
              <p className={`text-sm font-medium mb-6 ${bundle.popular ? "text-primary-foreground/80" : bundle.color.includes("slate-900") ? "text-slate-400" : "text-muted-foreground"}`}>
                {bundle.description}
              </p>
              
              <div className="text-3xl font-black tracking-tight mb-8">
                {bundle.price}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {bundle.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${bundle.popular ? "text-primary-foreground" : bundle.color.includes("slate-900") ? "text-slate-300" : "text-primary"}`} />
                    <span className="text-sm font-bold leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={bundle.popular ? "secondary" : "default"} 
                className={`w-full h-12 rounded-xl text-sm font-bold group ${
                  bundle.popular ? "bg-white text-primary hover:bg-slate-50" : 
                  bundle.color.includes("slate-900") ? "bg-white text-slate-900 hover:bg-slate-100" : 
                  "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                Claim This Bundle <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
