"use client"
import { motion } from "framer-motion"
import { ArrowRight, Wallet, ChefHat, Navigation, ShoppingBag, Sparkles } from "lucide-react"
import Link from "next/link"

const TOOLS = [
  {
    id: "salami",
    title: "Digital Salami Tracker",
    desc: "Log cash gifts, manage digital transfers via Raast/IBFT, and export your return-gift ledger effortlessly.",
    icon: Wallet,
    color: "emerald",
    href: "/dashboard/planner/salami"
  },
  {
    id: "daig",
    title: "AI Daig & Menu Calculator",
    desc: "Never under-order food again. Let our AI calculate exact Daigs, Naans, and Dessert based on season and guests.",
    icon: ChefHat,
    color: "red",
    href: "/tools/daig-calculator"
  },
  {
    id: "baraat",
    title: "Live Baraat Tracker",
    desc: "A live GPS link for your guests so they know exactly when the Groom is arriving. No more waiting hungry!",
    icon: Navigation,
    color: "blue",
    href: "/tools/baraat-tracker"
  },
  {
    id: "jahaiz",
    title: "Smart Jahaiz Registry",
    desc: "Manage the trousseau budget or share the list with extended family to turn it into a collaborative gift registry.",
    icon: ShoppingBag,
    color: "purple",
    href: "/tools/jahaiz-tracker"
  }
]

const colorMap: Record<string, string> = {
  emerald: "from-emerald-500 to-teal-600 shadow-emerald-500/20 text-emerald-100 button-emerald",
  red: "from-red-500 to-orange-600 shadow-red-500/20 text-red-100 button-red",
  blue: "from-blue-500 to-indigo-600 shadow-blue-500/20 text-blue-100 button-blue",
  purple: "from-purple-500 to-fuchsia-600 shadow-purple-500/20 text-purple-100 button-purple"
}

export function EventToolkitPromo() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 text-slate-800 font-bold mb-6 text-sm"
          >
            <Sparkles className="w-4 h-4 text-slate-600" /> THE NEXUS ECOSYSTEM
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight"
          >
            Not Just Venues.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Complete Wedding Solutions.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 font-medium"
          >
            We've built a suite of incredibly smart, culturally-aware tools to solve the biggest pain points of Pakistani weddings. All free for Nexus users.
          </motion.p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOOLS.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${colorMap[tool.color].split(' shadow-')[0]} text-white rounded-xl p-8 shadow-xl shadow-${tool.color}-500/20 hover:-translate-y-2 transition-transform duration-300 flex flex-col relative overflow-hidden group`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-colors" />
                
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 relative z-10 shadow-inner">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-black mb-3 relative z-10 leading-tight">
                  {tool.title}
                </h3>
                
                <p className={`text-sm font-medium mb-8 flex-grow relative z-10 opacity-90 leading-relaxed`}>
                  {tool.desc}
                </p>
                
                <Link href={tool.href} className="relative z-10 mt-auto">
                  <button className="w-full py-4 px-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-xl font-bold transition-colors flex items-center justify-between group/btn backdrop-blur-sm border border-white/20 hover:border-transparent">
                    Try it Now
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
